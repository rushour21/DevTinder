import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addConnections } from '../utils/connectionsSlice';
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Send, User, Search, MoreVertical, Plus, Users, Shield, ArrowLeft } from "lucide-react"
import { ChatDetails } from "./ChatDetails";

export default function Chat() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { targetedId: initialTargetedId, targetedName: initialTargetedName, targetedPhoto: initialTargetedPhoto } = location.state || {};

  const user = useSelector((state) => state.user);
  const connections = useSelector((store) => store.connections);
  const userId = user?._id;

  const [selectedChat, setSelectedChat] = useState(initialTargetedId ? { _id: initialTargetedId, firstName: initialTargetedName, photoUrl: initialTargetedPhoto, type: 'individual' } : null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [recentChats, setRecentChats] = useState([]);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedMemberToAdd, setSelectedMemberToAdd] = useState("");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const scrollRef = useRef();

  // Fetch connections (still needed for "Start new chat" or "Add Member")
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/connections`, { withCredentials: true });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch Recent Chats (Groups + 1-1 with Last Message)
  const fetchRecentChats = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/chat/recent`, { withCredentials: true });
      setRecentChats(res.data.chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

  useEffect(() => {
    if (!connections) fetchConnections();
    fetchRecentChats();
  }, [connections]); // Re-fetch when connections update to keep synced

  // Set initial selected chat
  useEffect(() => {
    if (initialTargetedId && (!selectedChat || selectedChat._id !== initialTargetedId)) {
      // Check if it's already in recent chats
      const existing = recentChats.find(c => c._id === initialTargetedId);
      if (existing) {
        setSelectedChat(existing);
      } else {
        // Fallback to connections
        const conn = connections?.find(c => c._id === initialTargetedId);
        if (conn) {
          setSelectedChat({ ...conn, type: 'individual' });
        } else {
          setSelectedChat({ _id: initialTargetedId, firstName: initialTargetedName, photoUrl: initialTargetedPhoto, type: 'individual' });
        }
      }
    }
  }, [initialTargetedId, connections, recentChats]);

  const sendMessage = () => {
    if (!newMsg.trim() || !selectedChat) return;
    const socket = createSocketConnection();
    const type = selectedChat.type || (selectedChat.members ? 'group' : 'individual');

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetedId: selectedChat._id,
      text: newMsg,
      type
    })
    setNewMsg("");
  };

  const createGroup = async () => {
    if (!newGroupName.trim()) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/group/create`, {
        name: newGroupName,
        description: newGroupDesc
      }, { withCredentials: true });

      fetchRecentChats(); // Refresh list to show new group
      setIsCreateGroupOpen(false);
      setNewGroupName("");
      setNewGroupDesc("");
      setSelectedChat({ ...res.data.group, type: 'group' });
    } catch (error) {
      console.error("Error creating group:", error);
    }
  }

  const addMemberToGroup = async () => {
    if (!selectedMemberToAdd || !selectedChat) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/group/add-member`, {
        groupId: selectedChat._id,
        userIdToAdd: selectedMemberToAdd
      }, { withCredentials: true });

      await fetchRecentChats(); // Update list data
      const updatedGroup = res.data.group;
      setSelectedChat({ ...updatedGroup, type: 'group' }); // Update active view
      setIsAddMemberOpen(false);
      setSelectedMemberToAdd("");
    } catch (error) {
      console.error("Error adding member:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Failed to add member");
    }
  }

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const type = selectedChat.type || (selectedChat.members ? 'group' : 'individual');
      let url = type === 'group'
        ? `${import.meta.env.VITE_API_URL}/group/${selectedChat._id}`
        : `${import.meta.env.VITE_API_URL}/chat/${selectedChat._id}`;

      const response = await axios.get(url, { withCredentials: true });

      // Normalize messages
      let rawMessages = [];
      if (type === 'group') {
        rawMessages = response.data.group.messages || [];
      } else {
        rawMessages = response.data.messages || [];
      }

      const chatmessages = rawMessages.map((msg) => {
        const senderName = msg.senderId.firstName || "Unknown";
        const senderId = msg.senderId._id || msg.senderId;
        return { from: senderName, text: msg.text, senderId: senderId, readBy: msg.readBy, createdAt: msg.createdAt }
      });
      setMessages(chatmessages);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!userId || !selectedChat) return;

    const socket = createSocketConnection();
    const type = selectedChat.type || (selectedChat.members ? 'group' : 'individual');

    socket.emit("joinChat", { userId, targetedId: selectedChat._id, type });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, { from: data.from, text: data.text, senderId: data.senderId, createdAt: new Date().toISOString() }]);
      fetchRecentChats(); // Update sidebar preview on new message
    });

    return () => {
      socket.disconnect();
    }
  }, [userId, selectedChat])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Filtered Chats
  const filteredRecentChats = recentChats.filter(chat => {
    const name = chat.type === 'group' ? chat.name : `${chat.firstName} ${chat.lastName}`;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredConnections = connections?.filter(c =>
    !recentChats.some(rc => rc._id === c._id) &&
    (`${c.firstName} ${c.lastName}`).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAdmin = selectedChat?.admin === userId || selectedChat?.admin?._id === userId;

  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)] bg-secondary/10 p-0 md:p-4">
      <Card className="flex w-full max-w-6xl h-full md:h-[85vh] shadow-xl overflow-hidden border-border/60 bg-background rounded-none md:rounded-xl border-x-0 md:border">

        {/* Sidebar */}
        <div className={`w-full md:w-1/3 border-r h-full flex flex-col bg-muted/10 ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b flex justify-between items-center bg-background/50 backdrop-blur sticky top-0 z-10">
            <h2 className="font-bold text-xl">Chats</h2>
            <div className="flex gap-2">
              <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" title="Create Group">
                    <Plus className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Group</DialogTitle>
                    <DialogDescription>Create a space for your team or friends.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Group Name</Label>
                      <Input placeholder="Tech Team Alpha" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input placeholder="Project discussions..." value={newGroupDesc} onChange={e => setNewGroupDesc(e.target.value)} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={createGroup}>Create Group</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                className="w-full bg-secondary/50 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Search chats"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredRecentChats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-secondary/30 transition-colors border-b border-border/40 ${selectedChat?._id === chat._id ? 'bg-secondary/40' : ''}`}
              >
                <div className="h-12 w-12 rounded-full border border-border overflow-hidden bg-secondary flex items-center justify-center relative shrink-0">
                  {chat.type === 'group' ? (
                    chat.photoUrl && !chat.photoUrl.includes("generic") ?
                      <img src={chat.photoUrl} alt={chat.name} className="h-full w-full object-cover" /> :
                      <Users className="h-6 w-6 text-primary" />
                  ) : (
                    <img src={chat.photoUrl || "https://geographyandyou.com/images/user-profile.png"} alt={chat.firstName} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold truncate">
                      {chat.type === 'group' ? chat.name : `${chat.firstName} ${chat.lastName}`}
                    </h3>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                      {chat.lastMessage ? new Date(chat.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate h-5">
                    {chat.lastMessage ? (
                      <span className={chat.type === 'group' ? "" : ""}>
                        {chat.lastMessage.senderId === userId ? "You: " : ""}{chat.lastMessage.text}
                      </span>
                    ) : (
                      <span className="italic opacity-70">Start a conversation</span>
                    )}
                  </p>
                </div>
              </div>
            ))}

            {/* Show un-chatted connections if not in recent list */}
            {filteredConnections && filteredConnections.length > 0 && (
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-secondary/20 mt-4">Other Connections</div>
            )}
            {filteredConnections && filteredConnections.map((conn) => (
              <div
                key={conn._id}
                onClick={() => setSelectedChat({ ...conn, type: 'individual' })}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-secondary/30 transition-colors border-b border-border/40 ${selectedChat?._id === conn._id ? 'bg-secondary/40' : ''}`}
              >
                <div className="h-12 w-12 rounded-full border border-border overflow-hidden bg-secondary">
                  <img src={conn.photoUrl || "https://geographyandyou.com/images/user-profile.png"} alt={conn.firstName} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{conn.firstName} {conn.lastName}</h3>
                  <p className="text-sm text-muted-foreground truncate">Say Hello! 👋</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col h-full bg-background/30 relative ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
          {selectedChat ? (
            <>
              {/* Header */}
              <div className="px-4 md:px-6 py-4 border-b bg-background/80 backdrop-blur flex justify-between items-center sticky top-0 z-10 cursor-pointer hover:bg-secondary/20 transition-colors" onClick={() => setIsDetailsOpen(true)}>
                <div className="flex items-center gap-3 md:gap-4">
                  <Button variant="ghost" size="icon" className="md:hidden -ml-2" onClick={(e) => { e.stopPropagation(); setSelectedChat(null); }}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden border flex items-center justify-center">
                    {selectedChat.type === 'group' ? (
                      <Users className="h-5 w-5 text-primary" />
                    ) : (
                      <img src={selectedChat.photoUrl || "https://geographyandyou.com/images/user-profile.png"} alt={selectedChat.firstName || selectedChat.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">{selectedChat.firstName ? `${selectedChat.firstName} ${selectedChat.lastName}` : selectedChat.name}</h2>
                    {selectedChat.type === 'individual' ? (
                      <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                        <span className="block h-2 w-2 rounded-full bg-green-500"></span> Online
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Click for info
                      </p>
                    )}
                  </div>
                </div>

                {/* Group Actions (Admin Only) */}
                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                  {selectedChat.type === 'group' && isAdmin && (
                    <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                      {/* ... existing add member dialog ... */}
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Plus className="h-4 w-4" /> Add
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Member to {selectedChat.name}</DialogTitle>
                          <DialogDescription>Select a connection to add to this group.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4 max-h-[300px] overflow-y-auto">
                          {connections?.filter(c => !selectedChat.members?.some(m => m._id === c._id)).length === 0 && (
                            <p className="text-sm text-muted-foreground text-center">No available connections to add.</p>
                          )}
                          {connections?.filter(c => !selectedChat.members?.some(m => m._id === c._id)).map(conn => (
                            <div
                              key={conn._id}
                              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer border ${selectedMemberToAdd === conn._id ? 'border-primary bg-primary/5' : 'border-border'}`}
                              onClick={() => setSelectedMemberToAdd(conn._id)}
                            >
                              <div className="h-8 w-8 rounded-full overflow-hidden">
                                <img src={conn.photoUrl} alt={conn.firstName} className="h-full w-full object-cover" />
                              </div>
                              <span className="text-sm font-medium">{conn.firstName} {conn.lastName}</span>
                            </div>
                          ))}
                        </div>
                        <DialogFooter>
                          <Button onClick={addMemberToGroup} disabled={!selectedMemberToAdd}>Add Member</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>

              <ChatDetails
                open={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
                chat={selectedChat}
                currentUserId={userId}
              />

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 bg-secondary/5 scroll-smooth">
                {messages.map((msg, i) => {
                  const isMe = msg.senderId === user?._id || msg.from === user?.firstName;
                  return (
                    <div key={i} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                      {selectedChat.type === 'group' && !isMe && (
                        <span className="text-[10px] text-muted-foreground ml-1 mb-1">{msg.from}</span>
                      )}
                      <div
                        className={`px-5 py-3 rounded-2xl max-w-[70%] text-sm leading-relaxed shadow-sm relative group ${isMe
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-card border text-card-foreground rounded-bl-sm"
                          }`}
                      >
                        {msg.text}
                        <span className="text-[10px] opacity-70 absolute bottom-1 right-2 translate-y-1/2 translate-x-1/4 hidden group-hover:block whitespace-nowrap">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {isMe && <span className="ml-1">✓</span>}
                        </span>
                      </div>
                    </div>
                  )
                })}
                <div ref={scrollRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-background border-t flex gap-2 items-center">
                <input
                  type="text"
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-secondary/30 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground"
                />
                <Button
                  onClick={sendMessage}
                  size="icon"
                  className="rounded-xl h-11 w-11 shrink-0 shadow-lg shadow-primary/20"
                >
                  <Send className="h-5 w-5 ml-0.5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-secondary/5">
              <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Send className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Your Messages</h3>
              <p className="max-w-xs">Select a conversation or create a group to start chatting.</p>
            </div>
          )}
        </div>

      </Card>
    </div>
  );
}