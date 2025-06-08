"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";

interface User {
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

const ROLES = ["USER", "ADMIN", "MANAGER"];

interface UsersAdminProps {}

export default function UsersAdmin(props: UsersAdminProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const [filterRole, setFilterRole] = useState<string | undefined>(undefined);
  const [searchEmail, setSearchEmail] = useState("");

  const [editUser, setEditUser] = useState<User | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());
      if (filterRole) params.append("role", filterRole);
      if (searchEmail.trim()) params.append("email", searchEmail.trim());

      const res = await fetch(`/api/users?${params.toString()}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok)
        throw new Error("Erreur lors du chargement des utilisateurs");

      const data = await res.json();
      setUsers(data.users);
      setTotal(data.total);
    } catch (err) {
      toast({
        title: "Erreur",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [page, limit, filterRole, searchEmail]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const totalPages = Math.ceil(total / limit);

  function openEdit(user: User) {
    setEditUser(user);
    setShowEditDialog(true);
  }
  function closeEdit() {
    setShowEditDialog(false);
    setEditUser(null);
  }

  function openDelete(userId: string) {
    setDeleteUserId(userId);
    setShowDeleteDialog(true);
  }
  function closeDelete() {
    setDeleteUserId(null);
    setShowDeleteDialog(false);
  }

  async function handleDelete() {
    if (!deleteUserId) return;
    try {
      const res = await fetch(`/api/users/${deleteUserId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Erreur suppression utilisateur");
      }
      toast({
        title: "Utilisateur supprimé",
        variant: "success",
      });
      closeDelete();
      fetchUsers();
    } catch (error) {
      toast({
        title: "Erreur",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  async function handleSave(updatedUser: Partial<User>) {
    if (!editUser) return;

    try {
      const res = await fetch(`/api/users/${editUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Erreur mise à jour utilisateur");
      }
      toast({
        title: "Utilisateur mis à jour",
        variant: "success",
      });
      closeEdit();
      fetchUsers();
    } catch (error) {
      toast({
        title: "Erreur",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  // Fonction pour rendre le contenu du tableau
  const renderTableContent = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center text-zinc-400">
            Chargement...
          </TableCell>
        </TableRow>
      );
    }

    if (users.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center text-zinc-400">
            Aucun utilisateur trouvé
          </TableCell>
        </TableRow>
      );
    }

    return users.map((user) => (
      <TableRow key={user._id} className="hover:bg-zinc-800 cursor-pointer">
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>
          <Badge
            variant={
              user.role === "ADMIN"
                ? "destructive"
                : user.role === "MANAGER"
                ? "warning"
                : "default"
            }
          >
            {user.role}
          </Badge>
        </TableCell>
        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
        <TableCell className="space-x-2">
          <Button size="sm" variant="outline" onClick={() => openEdit(user)}>
            Éditer
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => openDelete(user._id)}
          >
            Supprimer
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <Toaster />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-amber-400">
          Gestion des utilisateurs
        </h2>

        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <Input
            placeholder="Recherche par email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="max-w-xs"
          />
          <Select
            onValueChange={(val) => setFilterRole(val || undefined)}
            value={filterRole}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous</SelectItem>
              {ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setPage(1)} variant="secondary">
            Rechercher
          </Button>
        </div>

        <Table className="bg-zinc-900 border border-amber-500 rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Nom d'utilisateur</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderTableContent()}</TableBody>
        </Table>

        <div className="flex justify-between mt-4 items-center text-zinc-400">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Précédent
          </Button>
          <span>
            Page {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Suivant
          </Button>
        </div>

        {/* Dialog Edit */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Éditer utilisateur</DialogTitle>
              <DialogDescription>
                Modifier les informations de l'utilisateur
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={closeEdit}>
                Annuler
              </Button>
              <Button
                onClick={() =>
                  handleSave({
                    role: editUser?.role,
                  })
                }
              >
                Sauvegarder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Delete Confirmation */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer cet utilisateur ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={closeDelete}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
