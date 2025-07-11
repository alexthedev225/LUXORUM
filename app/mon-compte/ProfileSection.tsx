"use client";

import React, { ReactNode, useState, ChangeEvent } from "react";
import {
  Edit,
  Lock,
  Save,
  X,
  User,
  Mail,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative z-10 animate-in fade-in-0 zoom-in-95 duration-300 w-full max-w-md sm:max-w-lg mx-auto">
        {children}
      </div>
    </div>
  );
};

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`backdrop-blur-sm rounded-3xl shadow-2xl bg-zinc-900/70 ${className}`}
  >
    {children}
  </div>
);

const GlassCard: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`bg-gradient-to-br from-zinc-800/30 to-zinc-900/50 backdrop-blur-xl border border-amber-400/20 rounded-2xl shadow-2xl ${className}`}
  >
    {children}
  </div>
);

type ButtonVariant = "primary" | "ghost" | "outline" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  onClick,
  className = "",
  children,
  disabled = false,
  ...rest
}) => {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400 shadow-lg hover:shadow-amber-400/30",
    ghost:
      "bg-zinc-800/40 text-zinc-200 border border-zinc-700/50 hover:bg-zinc-700/60 hover:border-amber-400/30 hover:text-white",
    outline:
      "border-2 border-amber-400/40 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400/60",
    danger:
      "bg-gradient-to-r from-red-500/80 to-red-600/80 text-white hover:from-red-400 hover:to-red-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const Input: React.FC<InputProps> = ({
  icon: Icon,
  showPassword,
  onTogglePassword,
  className = "",
  ...props
}) => (
  <div className="relative group w-full">
    {Icon && (
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-amber-400 transition-colors duration-300" />
    )}
    <input
      className={`w-full ${Icon ? "pl-12" : "pl-4"} ${
        props.type === "password" && showPassword !== undefined
          ? "pr-12"
          : "pr-4"
      } py-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 ${className}`}
      {...props}
    />
    {props.type === "password" && showPassword !== undefined && (
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-amber-400 transition-colors duration-300"
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
    )}
  </div>
);

interface LabelProps {
  children: ReactNode;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ children, required = false }) => (
  <label className="block text-sm font-medium text-zinc-300 mb-3 tracking-wide">
    {children}
    {required && <span className="text-amber-400 ml-1">*</span>}
  </label>
);

interface ProfileFieldProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  value?: string;
  className?: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  icon: Icon,
  label,
  value,
  className = "",
}) => (
  <div className={`group ${className}`}>
    <div className="flex items-center space-x-3 mb-2">
      <Icon className="w-5 h-5 text-amber-400/70" />
      <Label>{label}</Label>
    </div>
    <div className="ml-8 p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/30 group-hover:border-amber-400/20 transition-all duration-300">
      <p className="text-white/90 text-lg font-light">
        {value || "Non renseigné"}
      </p>
    </div>
  </div>
);

const Divider: React.FC = () => (
  <div className="relative py-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>
    </div>
    <div className="relative flex justify-center">
      <div className="w-3 h-3 bg-amber-400/30 rounded-full"></div>
    </div>
  </div>
);

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface ProfileSectionProps {
  userData: UserData;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UserData>(userData);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSaveProfile = () => {
    // TODO: Sauvegarder les modifications du profil via API ou autre
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // TODO: Mettre à jour le mot de passe via API ou autre
    setIsPasswordModalOpen(false);
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleCancelEdit = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  return (
    <div className="bg-black p-4 sm:p-6 max-w-screen-xl ">
      <div className="space-y-8">
        {/* Carte principale */}
        <Card className="p-6">
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-light text-white tracking-wide flex-1 min-w-[180px]">
              Informations du profil
            </h2>
            <div className="flex flex-wrap gap-3 justify-end">
              {isEditing ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={handleCancelEdit}
                    type="button"
                    className="flex-1 min-w-[110px]"
                  >
                    <X className="w-4 h-4 mr-2" />
                    <span>Annuler</span>
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSaveProfile}
                    type="button"
                    className="flex-1 min-w-[110px]"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    <span>Sauvegarder</span>
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  type="button"
                  className="flex-1 min-w-[110px]"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  <span>Modifier</span>
                </Button>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label required>Prénom</Label>
                    <Input
                      icon={User}
                      type="text"
                      value={editData.firstName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditData({ ...editData, firstName: e.target.value })
                      }
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <Label required>Nom</Label>
                    <Input
                      icon={User}
                      type="text"
                      value={editData.lastName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditData({ ...editData, lastName: e.target.value })
                      }
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label required>Email</Label>
                    <Input
                      icon={Mail}
                      type="email"
                      value={editData.email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <Label>Téléphone</Label>
                    <Input
                      icon={Phone}
                      type="tel"
                      value={editData.phone}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileField
                  icon={User}
                  label="Prénom"
                  value={userData.firstName}
                />
                <ProfileField
                  icon={User}
                  label="Nom"
                  value={userData.lastName}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileField
                  icon={Mail}
                  label="Email"
                  value={userData.email}
                />
                <ProfileField
                  icon={Phone}
                  label="Téléphone"
                  value={userData.phone}
                />
              </div>
            </div>
          )}

          <Divider />

          <div className="space-y-6">
            <h3 className="text-xl font-light text-white tracking-wide">
              Sécurité
            </h3>
            <GlassCard className="p-6">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center space-x-4 flex-1 min-w-[220px]">
                  <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Mot de passe</p>
                    <p className="text-zinc-400 text-sm">
                      Dernière modification il y a 30 jours
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="space-x-2 min-w-[110px]"
                  type="button"
                >
                  <span>Modifier</span>
                </Button>
              </div>
            </GlassCard>
          </div>
        </Card>

        {/* Modal changement de mot de passe */}
        <Modal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        >
          <Card className="p-8 w-full max-w-md sm:max-w-lg mx-4">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h3 className="text-2xl font-light text-white tracking-wide flex-1 min-w-[180px]">
                Nouveau mot de passe
              </h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-300"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <Label required>Mot de passe actuel</Label>
                <Input
                  icon={Lock}
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.current}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPasswordData({
                      ...passwordData,
                      current: e.target.value,
                    })
                  }
                  placeholder="••••••••••••"
                  showPassword={showCurrentPassword}
                  onTogglePassword={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                />
              </div>

              <div>
                <Label required>Nouveau mot de passe</Label>
                <Input
                  icon={Lock}
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.new}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPasswordData({ ...passwordData, new: e.target.value })
                  }
                  placeholder="••••••••••••"
                  showPassword={showNewPassword}
                  onTogglePassword={() => setShowNewPassword(!showNewPassword)}
                />
              </div>

              <div>
                <Label required>Confirmer le mot de passe</Label>
                <Input
                  icon={Lock}
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPasswordData({
                      ...passwordData,
                      confirm: e.target.value,
                    })
                  }
                  placeholder="••••••••••••"
                  showPassword={showConfirmPassword}
                  onTogglePassword={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  variant="ghost"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 min-w-[110px]"
                  type="button"
                >
                  Annuler
                </Button>
                <Button
                  variant="primary"
                  onClick={handleChangePassword}
                  className="flex-1 min-w-[110px]"
                  type="button"
                >
                  Mettre à jour
                </Button>
              </div>
            </div>
          </Card>
        </Modal>
      </div>
    </div>
  );
};

export default ProfileSection;
