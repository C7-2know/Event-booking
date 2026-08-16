import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userService";

export default function Profile() {
  const { user, setUser } = useAuth();

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({ ...user });
  const [preview, setPreview] = useState(user.avatarUrl || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Validate file size - 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    setSelectedFile(file);

    // Create preview
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const save = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      let updatedUser = form;

      // Upload profile picture if a new one was selected
      if (selectedFile) {
        const imageResponse = await userService.uploadProfilePicture(
          user.id,
          selectedFile,
        );

        updatedUser = {
          ...updatedUser,
          avatarUrl: imageResponse.avatarUrl,
        };
      }

      // Update profile information
      const profileResponse = await userService.updateProfile(
        user.id,
        updatedUser,
      );

      const finalUser = profileResponse?.user || updatedUser;

      setUser(finalUser);
      setForm(finalUser);

      if (finalUser.avatarUrl) {
        setPreview(finalUser.avatarUrl);
      }

      setSelectedFile(null);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(
        error.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="page-wrap max-w-4xl py-12 md:py-16">
      <p className="eyebrow">Account</p>

      <h1 className="mt-2 text-4xl font-bold tracking-[-.06em]">
        Your profile
      </h1>

      <div className="mt-10 grid gap-10 md:grid-cols-[180px_1fr]">
        {/* Profile picture */}
        <div>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative h-24 w-24 cursor-pointer overflow-hidden rounded-full"
          >
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-[#dcece9] text-2xl font-bold text-emerald">
                {user.avatar}
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
              Change photo
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 text-sm font-medium text-emerald hover:underline"
          >
            {preview ? "Change photo" : "Upload photo"}
          </button>

          <p className="mt-4 text-sm text-muted">Member since {user.joined}</p>
        </div>

        {/* Profile form */}
        <form
          onSubmit={save}
          className="max-w-lg space-y-5 border-t border-line pt-6"
        >
          <label className="block text-sm font-semibold">
            Full name
            <input
              value={form.name || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="form-input mt-2"
            />
          </label>

          <label className="block text-sm font-semibold">
            Email address
            <input
              value={form.email || ""}
              disabled
              className="form-input mt-2"
            />
          </label>

          <label className="block text-sm font-semibold">
            Bio
            <textarea
              value={form.bio || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  bio: e.target.value,
                })
              }
              rows="4"
              placeholder="A few words about you"
              className="form-input mt-2 resize-none"
            />
          </label>

          <button
            type="submit"
            disabled={uploading}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? "Saving..." : "Save changes"}
          </button>

          {saved && (
            <span className="ml-4 text-sm text-emerald">
              Saved successfully
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
