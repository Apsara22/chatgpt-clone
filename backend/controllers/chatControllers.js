import { Chat } from "../models/chat.js"
import { Conversation } from "../models/conversation.js"
import axios from "axios";

export const createChat = async (req, res) => {
    try {
        const userId = req.user._id

        const chat = await Chat.create({
            user: userId,

        })
        res.json(chat);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .lean(); // return plain JS objects

        // Populate messages (conversations) for each chat
        const chatsWithMessages = await Promise.all(
            chats.map(async (chat) => {
                const messages = await Conversation.find({ chat: chat._id })
                    .sort({ createdAt: 1 }) // oldest first
                    .lean();

                return {
                    ...chat,
                    messages: messages.map((msg) => ({
                        text: msg.question,
                        answer: msg.answer,
                        createdAt: msg.createdAt,
                    })),
                };
            })
        );

        res.json(chatsWithMessages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const addConversation = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // ✅ debug
        console.log("Chat ID:", req.params.id); // ✅ debug

        const chat = await Chat.findById(req.params.id);

        if (!chat) {
            return res.status(404).json({
                message: "No chat with this id",
            });
        }

        // ✅ check question
        if (!req.body.question) {
            return res.status(400).json({
                message: "Question is required",
            });
        }

        let answer = "Default response";

        try {
            const aiResponse = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    model: "openai/gpt-4o-mini",
                    messages: [
                        {
                            role: "user",
                            content: req.body.question,
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // ✅ SAFE access (no crash)
            answer = aiResponse?.data?.choices?.[0]?.message?.content || "No response";

        } catch (apiError) {
            console.log("AI ERROR:", apiError.response?.data || apiError.message);
            answer = "AI service failed"; // fallback
        }

        const conversation = await Conversation.create({
            chat: chat._id,
            question: req.body.question,
            answer: answer,
        });

        const updatedChat = await Chat.findByIdAndUpdate(
            req.params.id,
            {
                latestMessage: req.body.question,
                updatedAt: new Date()
            },
            { new: true }
        );

        res.json({
            conversation,
            updatedChat,
        });

    } catch (error) {
        console.log("MAIN ERROR:", error); // 🔥 SEE REAL ERROR
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({ chat: req.params.id })

        if (!conversation)
            return res.status(404).json({
                message: "No conversation with this id",

            });
        res.json(conversation);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);

        if (!chat) {
            return res.status(404).json({
                message: "No chat with this id",
            });
        }

        // Fix: Remove the space between ! and ==, and use !== properly
        if (chat.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        await chat.deleteOne();

        res.json({
            message: "Chat Deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};