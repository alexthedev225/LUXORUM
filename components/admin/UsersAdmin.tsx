"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  Calendar,
  Trash2,
  Edit,
  Search,
  Filter,
  Crown,
  Shield,
  UserCheck,
} from "lucide-react";

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

interface UsersAdminProps {
  users: UserData[];
  total: number;
  page: number;
  limit: number;
  onPageChange?: (page: number) => void;
  onDeleteUser?: (userId: string) => Promise<void>;
  onUpdateUser?: (updatedUser: Partial<UserData>) => Promise<void>;
}

const ROLES = ["USER", "ADMIN", "MANAGER"];

export default function UsersAdmin({
  users,
  total,
  page,
  limit,
  onPageChange,
  onDeleteUser,
  onUpdateUser,
}: UsersAdminProps) {
  const [filterRole, setFilterRole] = useState<string | undefined>(undefined);
  const [searchEmail, setSearchEmail] = useState("");
  const [editUser, setEditUser] = useState<UserData | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(total / limit);

  const openEdit = (user: UserData) => {
    setEditUser(user);
    setShowEditDialog(true);
  };

  const closeEdit = () => {
    setShowEditDialog(false);
    setEditUser(null);
  };

  const openDelete = (userId: string) => {
    setDeleteUserId(userId);
    setShowDeleteDialog(true);
  };

  const closeDelete = () => {
    setDeleteUserId(null);
    setShowDeleteDialog(false);
  };

  const handleDelete = async () => {
    if (!deleteUserId || !onDeleteUser) return;
    setLoading(true);
    try {
      await onDeleteUser(deleteUserId);
      closeDelete();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedUser: Partial<UserData>) => {
    if (!editUser || !onUpdateUser) return;
    setLoading(true);
    try {
      await onUpdateUser({ ...editUser, ...updatedUser });
      closeEdit();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "destructive";
      case "MANAGER":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black relative">
      {/* Texture overlay décorative */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header avec lueur dorée */}
          <div className="mb-12 text-center">
            <div className="relative">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text mb-4 tracking-tight">
                Gestion des Utilisateurs
              </h1>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
            </div>
            <p className="text-zinc-400/90 text-lg font-light tracking-wide mt-6">
              Administration des comptes et privilèges
            </p>

            {/* Stats en haut */}
            <div className="flex justify-center items-center space-x-8 mt-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-amber-300/90 tracking-[0.2em] uppercase">
                  {total} Utilisateurs
                </span>
              </div>
              <div className="w-px h-4 bg-zinc-800/50"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-400/60 rounded-full"></div>
                <span className="text-xs text-amber-300/90 tracking-[0.2em] uppercase">
                  Page {page} / {totalPages}
                </span>
              </div>
            </div>
          </div>

          {/* Filtres avec design luxe */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Recherche par email */}
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400/60 group-hover:text-amber-400 transition-colors duration-300" />
                  <Input
                    placeholder="Recherche par email..."
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="pl-12 bg-black/60 border-zinc-800/50 text-white/95 placeholder:text-zinc-400/90 rounded-xl h-14 focus:border-amber-400/30 focus:ring-2 focus:ring-amber-400/10 transition-all duration-300"
                  />
                </div>

                {/* Filtre par rôle */}
                <div className="relative group">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400/60 group-hover:text-amber-400 transition-colors duration-300 z-10" />
                  <Select
                    onValueChange={(val) =>
                      setFilterRole(val === "all" ? undefined : val)
                    }
                    value={filterRole || "all"}
                  >
                    <SelectTrigger className="pl-12 bg-black/60 border-zinc-800/50 text-white/95 rounded-xl h-14 focus:border-amber-400/30 focus:ring-2 focus:ring-amber-400/10 transition-all duration-300">
                      <SelectValue placeholder="Filtrer par rôle" />
                    </SelectTrigger>
                    <SelectContent className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-amber-400/20 backdrop-blur-xl">
                      <SelectItem
                        value="all"
                        className="text-zinc-300/90 hover:bg-amber-400/10 focus:bg-amber-400/10"
                      >
                        Tous les rôles
                      </SelectItem>
                      {ROLES.map((role) => (
                        <SelectItem
                          key={role}
                          value={role}
                          className="text-zinc-300/90 hover:bg-amber-400/10 focus:bg-amber-400/10"
                        >
                          <div className="flex items-center space-x-2">
                            {getRoleIcon(role)}
                            <span>{role}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Bouton recherche */}
                <Button
                  onClick={() => onPageChange?.(1)}
                  className="bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl h-14 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>
          </div>

          {/* Empty State élégant */}
          {!loading && users.length === 0 && (
            <div className="text-center py-24">
              <div className="relative mb-8">
                <div className="mx-auto h-24 w-24 bg-gradient-to-br from-amber-400/20 via-amber-400/10 to-transparent rounded-full flex items-center justify-center backdrop-blur-sm border border-amber-400/20">
                  <User className="h-12 w-12 text-amber-400/60" />
                </div>
                <div className="absolute inset-0 animate-ping">
                  <div className="mx-auto h-24 w-24 bg-amber-400/5 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-light text-zinc-300/90 mb-4">
                Aucun utilisateur trouvé
              </h3>
              <p className="text-zinc-400/90 text-lg">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}

          {/* Users Grid luxueux */}
          {!loading && users.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {users.map((user, index) => (
                <Card
                  key={user._id}
                  className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-amber-400/20 hover:border-amber-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 group relative overflow-hidden backdrop-blur-sm"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  {/* Lueur décorative au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Avatar avec gradient doré */}
                        <div className="relative">
                          <div className="h-14 w-14 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/25">
                            <User className="h-7 w-7 text-black" />
                          </div>
                          <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-white/95 text-base font-medium truncate">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user.username}
                          </CardTitle>
                          <p className="text-xs text-zinc-400/90 truncate mt-1 tracking-wide">
                            @{user.username}
                          </p>
                        </div>
                      </div>

                      {/* Badge rôle stylisé */}
                      <div className="flex items-center space-x-1">
                        {getRoleIcon(user.role)}
                        <Badge
                          variant={getRoleBadgeVariant(user.role)}
                          className="text-xs px-3 py-1 font-medium tracking-wide"
                        >
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 relative z-10">
                    <div className="space-y-4">
                      {/* Email */}
                      <div className="flex items-center space-x-3 text-sm">
                        <Mail className="h-4 w-4 text-amber-400/60 flex-shrink-0" />
                        <span className="text-zinc-300/90 truncate">
                          {user.email}
                        </span>
                      </div>

                      {/* Date de création */}
                      <div className="flex items-center space-x-3 text-sm">
                        <Calendar className="h-4 w-4 text-amber-400/60 flex-shrink-0" />
                        <span className="text-zinc-300/90">
                          Créé le{" "}
                          {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                        </span>
                      </div>

                      {/* Séparateur décoratif */}
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent my-4"></div>

                      {/* Actions */}
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(user)}
                          className="flex-1 bg-black/60 border-zinc-800/90 text-zinc-300/90 hover:bg-amber-400/10 hover:border-amber-400/30 hover:text-white transition-all duration-300 rounded-lg"
                        >
                          <Edit className="h-3 w-3 mr-2" />
                          Éditer
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDelete(user._id)}
                          className="flex-1 bg-black/60 border-red-900/50 text-red-400/90 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-300 transition-all duration-300 rounded-lg"
                        >
                          <Trash2 className="h-3 w-3 mr-2" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination luxueuse */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <div className="flex items-center space-x-2 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 rounded-2xl p-4 backdrop-blur-sm">
                <Button
                  onClick={() => onPageChange?.(page - 1)}
                  disabled={page <= 1}
                  variant="outline"
                  className="bg-black/60 border-zinc-800/50 text-zinc-300/90 hover:bg-amber-400/10 hover:border-amber-400/30 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl px-6 py-2 transition-all duration-300"
                >
                  Précédent
                </Button>

                <div className="flex space-x-1 mx-4">
                  {[...Array(Math.min(totalPages, 7)).keys()].map((num) => {
                    let p;
                    if (totalPages <= 7) {
                      p = num + 1;
                    } else {
                      if (page <= 4) {
                        p = num + 1;
                      } else if (page >= totalPages - 3) {
                        p = totalPages - 6 + num;
                      } else {
                        p = page - 3 + num;
                      }
                    }

                    return (
                      <Button
                        key={p}
                        onClick={() => onPageChange?.(p)}
                        variant={p === page ? "default" : "outline"}
                        className={
                          p === page
                            ? "bg-amber-500 hover:bg-amber-600 text-black rounded-xl w-12 h-12 transition-all duration-300"
                            : "bg-black/60 border-zinc-800/50 text-zinc-300/90 hover:bg-amber-400/10 hover:border-amber-400/30 rounded-xl w-12 h-12 transition-all duration-300"
                        }
                      >
                        {p}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  onClick={() => onPageChange?.(page + 1)}
                  disabled={page >= totalPages}
                  variant="outline"
                  className="bg-black/60 border-zinc-800/50 text-zinc-300/90 hover:bg-amber-400/10 hover:border-amber-400/30 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl px-6 py-2 transition-all duration-300"
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}

          {/* Edit Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-amber-400/20 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-light text-white/95 mb-2">
                  Modifier l'utilisateur
                </DialogTitle>
                <DialogDescription className="text-zinc-400/90 text-base">
                  Modifiez les informations et rôles de l'utilisateur.
                </DialogDescription>
              </DialogHeader>

              {editUser && (
                <EditUserForm
                  user={editUser}
                  onSave={handleSave}
                  onCancel={closeEdit}
                  loading={loading}
                />
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent className="sm:max-w-[450px] bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-amber-400/20 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-light text-white/95 mb-2">
                  Confirmer la suppression
                </DialogTitle>
                <DialogDescription className="text-zinc-400/90 text-base">
                  Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette
                  action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end space-x-4 pt-6">
                <Button
                  variant="outline"
                  onClick={closeDelete}
                  disabled={loading}
                  className="bg-black/60 border-zinc-800/50 text-zinc-300/90 hover:bg-zinc-800/80 rounded-xl px-6 py-2 transition-all duration-300"
                >
                  Annuler
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 py-2 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
                >
                  {loading ? "Suppression..." : "Supprimer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

// Composant de formulaire d'édition luxueux
interface EditUserFormProps {
  user: UserData;
  onSave: (data: Partial<UserData>) => void;
  onCancel: () => void;
  loading: boolean;
}

function EditUserForm({ user, onSave, onCancel, loading }: EditUserFormProps) {
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
