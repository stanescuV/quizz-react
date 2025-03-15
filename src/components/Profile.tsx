import React, { useState } from "react";

export const Profile: React.FC = () => {
  const [name, setName] = useState("John Doe");
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4 border rounded-lg shadow-md max-w-sm mx-auto">
      <div className="w-32 h-32 rounded-full overflow-hidden border">
        {avatar ? (
          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            No Avatar
          </div>
        )}
      </div>
      <input type="file" accept="image/*" onChange={handleAvatarChange} className="p-2 border rounded" />
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className="border p-2 rounded w-full text-center"
      />
      <p className="text-lg font-semibold">{name}</p>
    </div>
  );
};

