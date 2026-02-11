import React, { useState } from "react";
import { useScenario } from "@/context/ScenarioContext";
import { Send, Smile, Paperclip } from "lucide-react";

export function SpaceChat() {
  const { scenario } = useScenario();
  const [message, setMessage] = useState("");

  // Combine all chat messages for demo
  const allMessages = scenario?.unified_chat.flatMap((chat) =>
    chat.messages.map((msg, idx) => ({
      ...msg,
      id: `${chat.related_object_id}-${idx}`,
      objectId: chat.related_object_id,
    }))
  ) || [];

  const avatarColors = ["bg-luklak-teal", "bg-luklak-blue", "bg-luklak-orange", "bg-luklak-purple"];

  const getAvatarColor = (user: string): string => {
    const hash = user.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatarColors[hash % avatarColors.length];
  };

  return (
    <div className="flex-1 flex flex-col bg-card">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {allMessages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-lg font-medium">Space Chat</p>
              <p className="text-sm mt-2">Team messages will appear here</p>
            </div>
          </div>
        ) : (
          <>
            {allMessages.map((msg, index) => {
              const isCurrentUser = msg.user === "Demo User";

              return (
                <div
                  key={msg.id}
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} items-start space-x-3`}
                >
                  {!isCurrentUser && (
                    <div
                      className={`w-8 h-8 rounded-full ${getAvatarColor(msg.user)} flex items-center justify-center text-card font-semibold text-sm flex-shrink-0`}
                    >
                      {msg.user.charAt(0)}
                    </div>
                  )}
                  <div className={`max-w-xl ${isCurrentUser ? "order-first" : ""}`}>
                    {!isCurrentUser && (
                      <div className="text-xs text-muted-foreground mb-1">{msg.user}</div>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{msg.timestamp}</div>
                  </div>
                  {isCurrentUser && (
                    <div
                      className={`w-8 h-8 rounded-full ${getAvatarColor(msg.user)} flex items-center justify-center text-card font-semibold text-sm flex-shrink-0`}
                    >
                      {msg.user.charAt(0)}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            <div className="flex items-center justify-center text-primary text-sm italic space-x-2 py-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
              <span>several people are typing</span>
            </div>
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-muted rounded text-muted-foreground">
            <Smile className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-muted rounded text-muted-foreground">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-card"
          />
          <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
