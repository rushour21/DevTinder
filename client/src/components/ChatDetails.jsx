import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Users, Shield } from "lucide-react"

export function ChatDetails({ open, onOpenChange, chat, currentUserId }) {
    if (!chat) return null;

    // Check type by existence of members or explicit type
    const isGroup = chat.type === 'group' || !!chat.members;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isGroup ? "Group Details" : "Contact Info"}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center pt-4 pb-6">
                    <div className="h-24 w-24 rounded-full overflow-hidden mb-4 border-4 border-secondary/50 shadow-sm">
                        {isGroup ? (
                            chat.photoUrl && !chat.photoUrl.includes("generic") ?
                                <img src={chat.photoUrl} alt={chat.name} className="h-full w-full object-cover" /> :
                                <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                                    <Users className="h-10 w-10 text-primary" />
                                </div>
                        ) : (
                            <img src={chat.photoUrl || "https://geographyandyou.com/images/user-profile.png"} alt={chat.firstName} className="h-full w-full object-cover" />
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-center">
                        {isGroup ? chat.name : `${chat.firstName} ${chat.lastName}`}
                    </h2>

                    {/* Description/About */}
                    <p className="text-sm text-muted-foreground text-center mt-2 max-w-[80%]">
                        {isGroup ? (chat.description || "No group description") : (chat.about || "Hey there! I am using Nexer.")}
                    </p>
                </div>

                {isGroup && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                {chat.members?.length || 0} Members
                            </h4>
                        </div>
                        <div className="max-h-[200px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                            {chat.members?.map(member => (
                                <div key={member._id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                                    <div className="h-8 w-8 rounded-full overflow-hidden bg-secondary">
                                        <img src={member.photoUrl || "https://geographyandyou.com/images/user-profile.png"} alt={member.firstName} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium leading-none">
                                            {member.firstName} {member.lastName}
                                            {member._id === currentUserId && " (You)"}
                                        </p>
                                    </div>
                                    {(chat.admin === member._id || chat.admin?._id === member._id) && (
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">
                                            Admin
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
