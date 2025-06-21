"use client";

import React, { useState } from "react";
import Header from "./Header";
import UsersFilter from "./UsersFilter";
import UsersGrid from "./UsersGrid";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import EmptyState from "./EmptyState";
import { UserData } from "./types";

interface UsersAdminProps {
  users: UserData[];
  total: number;
  page: number;
  limit: number;
  onPageChange?: (page: number) => void;
  onDeleteUser?: (userId: string) => Promise<void>;
  onUpdateUser?: (updatedUser: Partial<UserData>) => Promise<void>;
}

export default function UsersAdmin({
  users,
  total,
  page,
  limit,
  onPageChange,
  onDeleteUser,
  onUpdateUser,
}: UsersAdminProps) {
  const [filteredUsers, setFilteredUsers] = React.useState<UserData[]>(users);

  const [filterRole, setFilterRole] = React.useState<string | undefined>();
  const [searchEmail, setSearchEmail] = React.useState("");
  const [editUser, setEditUser] = React.useState<UserData | null>(null);
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [deleteUserId, setDeleteUserId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const totalPages = Math.ceil(total / limit);

  // Ouvre le dialogue d'édition
  const openEdit = (user: UserData) => {
    setEditUser(user);
    setShowEditDialog(true);
  };

  const closeEdit = () => {
    setShowEditDialog(false);
    setEditUser(null);
  };

  // Ouvre le dialogue suppression
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

React.useEffect(() => {
  let filtered = users;

  if (searchEmail) {
    filtered = filtered.filter((user) =>
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  }

  if (filterRole) {
    filtered = filtered.filter((user) => user.role === filterRole);
  }

  setFilteredUsers(filtered);
}, [users, searchEmail, filterRole]);

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <Header total={total} totalPages={totalPages} page={page} />

        <UsersFilter
          filterRole={filterRole}
          setFilterRole={setFilterRole}
          searchEmail={searchEmail}
          setSearchEmail={setSearchEmail}
          onSearch={() => onPageChange?.(1)}
        />

        {!loading && users.length === 0 && <EmptyState />}

        {!loading && users.length > 0 && (
          <UsersGrid
            users={filteredUsers}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        )}

        <EditUserDialog
          open={showEditDialog}
          user={editUser}
          onClose={closeEdit}
          onSave={handleSave}
          loading={loading}
        />

        <DeleteUserDialog
          open={showDeleteDialog}
          loading={loading}
          onClose={closeDelete}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}
