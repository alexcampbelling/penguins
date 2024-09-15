"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type Penguin = {
  id: string;
  name: string;
  imageUrl: string;
};

type User = {
  username: string;
  penguins: Penguin[];
};

export default function UserPage() {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">{user.username}'s Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {user.penguins.map((penguin) => (
          <div key={penguin.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="relative w-full h-48 mb-2">
              <Image
                src={penguin.imageUrl}
                alt={penguin.name}
                fill
                style={{ objectFit: "cover" }}
                className="rounded"
              />
            </div>
            <h2 className="text-xl font-semibold">{penguin.name}</h2>
            <Link
              href={`/penguin/${penguin.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
