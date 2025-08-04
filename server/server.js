import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize socket.io
export const io = new Server(server, {
  cors: { origin: "*" },
});

// Stores online users: { userId: socketId }
export const userSocketMap = {};

// Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
  console.log("✅ User connected:", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Emit updated list of online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Listen for messages and emit to recipient
  socket.on("sendMessage", ({ recipientId, message }) => {
    const receiverSocketId = userSocketMap[recipientId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        senderId: userId,
        message,
      });
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Routes setup
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRoutes);

// Connect to MongoDB and start server
await connectDB();
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("🚀 Server running on port:", PORT));
