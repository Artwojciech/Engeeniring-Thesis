import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";

import { updateUsername, updatePassword } from "@/services/user";

import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function UserSidePanel() {
  const { user, setUser } = useAuth();

  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const [changePass, setChangePass] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordValid = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword);
  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <p className="text-muted-foreground">brak danych</p>
      </div>
    );
  }

  const handleUsernameChange = async () => {
    if (!newUsername) {
      toast.error("username cannot be empty");
      return;
    }
    try {
      const updated = await updateUsername(user.id, newUsername);
      setUser(updated);
      toast.success("username changed successfully");
      setEditUsername(false);
      setNewUsername("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("failed to update username");
      }
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("fill in all boxes");
      return;
    }
    if (!passwordValid) {
      toast.error("password does not meet requirements");
      return;
    }
    if (!passwordsMatch) {
      toast.error("passwords must match");
      return;
    }
    try {
      await updatePassword(user.id, currentPassword, newPassword);
      toast.success("password updated successfully!");
      setChangePass(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("failed to update password");
      }
    }
  };

  return (
    <div className={`flex flex-col gap-4 p-4 md:p-6 md:mt-6`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{user.username}</h2>
        <Button
          size="sm"
          onClick={() => setEditUsername(!editUsername)}
          className="text-sm  hover:underline cursor-pointer"
        >
          Change
        </Button>
      </div>

      {editUsername && (
        <div className="space-y-2">
          <Label htmlFor="newUsername">New username</Label>
          <Input
            id="newUsername"
            placeholder="put new username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="border-footerbg"
          />
          <Button
            size="sm"
            className="cursor-pointer"
            onClick={handleUsernameChange}
          >
            Save
          </Button>
        </div>
      )}

      <Separator />

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Email: </span>
          <span className="text-muted-foreground">{user.email}</span>
        </p>
        <p>
          <span className="font-medium">Date of birth: </span>
          <span className="text-muted-foreground">
            {new Date(user.age).toLocaleDateString()}
          </span>
        </p>
        <p>
          <span className="font-medium">Role: </span>
          {user.is_admin ? (
            <Badge variant="destructive">Admin</Badge>
          ) : (
            <Badge>Regular</Badge>
          )}
        </p>
      </div>

      <div>
        <Button
          size="sm"
          onClick={() => setChangePass(!changePass)}
          className="text-sm hover:underline cursor-pointer"
        >
          Change password
        </Button>

        {changePass && (
          <div className="flex flex-col gap-3 mt-3 text-sm">
            <div className="grid gap-2 relative">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                placeholder="*********"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="pr-10 border-footerbg"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-2 top-[1.875rem] text-footerbg"
              >
                {showCurrent ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="grid gap-2 relative">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                placeholder="*********"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pr-10 border-footerbg"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-2 top-[1.875rem] text-footerbg"
              >
                {showNew ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
              <div className="flex items-center gap-1 text-xs mt-1">
                {passwordValid ? (
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircleIcon className="w-4 h-4 text-red-500" />
                )}
                <span className="text-footerbg">
                  the password must have at least 8 letters, one capital letter
                  and one number
                </span>
              </div>
            </div>

            <div className="grid gap-2 relative">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <Input
                id="confirmPassword"
                placeholder="*********"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10 border-footerbg"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2 top-[1.875rem] text-footerbg"
              >
                {showConfirm ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
              {!passwordsMatch && confirmPassword.length > 0 && (
                <span className="text-xs text-red-500">
                  the passwords must be the same
                </span>
              )}
            </div>

            <Button
              size="sm"
              className="cursor-pointer"
              onClick={handlePasswordChange}
            >
              Save new password
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
