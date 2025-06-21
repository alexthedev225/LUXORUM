import { Crown, Mail, Shield, User, UserCheck } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export interface UserData {
  _id: string;
  email: string;
  username: string;
  role: "USER" | "ADMIN" | "MANAGER";
  permissions: string[];
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
}
// Composant de formulaire d'édition luxueux
interface EditUserFormProps {
  user: UserData;
  onSave: (data: Partial<UserData>) => void;
  onCancel: () => void;
  loading: boolean;
}

const ROLES = ["USER", "ADMIN", "MANAGER"];

export default function EditUserForm({ user, onSave, onCancel, loading }: EditUserFormProps) {
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [role, setRole] = useState(user.role);

  const canSave =
    email.trim() !== "" && username.trim() !== "" && role.trim() !== "";

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Crown className="h-4 w-4" />;
      case "MANAGER":
        return <Shield className="h-4 w-4" />;
      default:
        return <UserCheck className="h-4 w-4" />;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSave) return;
        onSave({ email, username, role });
      }}
      className="space-y-6 mt-6"
    >
      {/* Email field */}
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-zinc-300/90 tracking-wide"
          htmlFor="email"
        >
          <Mail className="inline h-4 w-4 mr-2 text-amber-400/60" />
          Adresse Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="bg-black/60 border-zinc-800/50 text-white/95 rounded-xl h-12 focus:border-amber-400/30 focus:ring-2 focus:ring-amber-400/10 transition-all duration-300"
          required
        />
      </div>

      {/* Username field */}
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-zinc-300/90 tracking-wide"
          htmlFor="username"
        >
          <User className="inline h-4 w-4 mr-2 text-amber-400/60" />
          Nom d'utilisateur
        </label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          className="bg-black/60 border-zinc-800/50 text-white/95 rounded-xl h-12 focus:border-amber-400/30 focus:ring-2 focus:ring-amber-400/10 transition-all duration-300"
          required
        />
      </div>

      {/* Role field */}
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-zinc-300/90 tracking-wide"
          htmlFor="role"
        >
          <Shield className="inline h-4 w-4 mr-2 text-amber-400/60" />
          Rôle d'utilisateur
        </label>
        <Select
          value={role}
          onValueChange={(val) => setRole(val as UserData["role"])}
          disabled={loading}
        >
          <SelectTrigger className="bg-black/60 border-zinc-800/50 text-white/95 rounded-xl h-12 focus:border-amber-400/30 focus:ring-2 focus:ring-amber-400/10 transition-all duration-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-amber-400/20 backdrop-blur-xl">
            {ROLES.map((r) => (
              <SelectItem
                key={r}
                value={r}
                className="text-zinc-300/90 hover:bg-amber-400/10 focus:bg-amber-400/10"
              >
                <div className="flex items-center space-x-2">
                  {getRoleIcon(r)}
                  <span>{r}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent my-6"></div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="bg-black/60 border-zinc-800/50 text-zinc-300/90 hover:bg-zinc-800/80 rounded-xl px-6 py-2 transition-all duration-300"
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={!canSave || loading}
          className="bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl px-8 py-2 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sauvegarde..." : "Sauvegarder"}
        </Button>
      </div>
    </form>
  );
}
