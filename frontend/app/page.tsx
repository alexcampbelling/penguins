"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { penguinData, PenguinData } from "@/lib/penguinData";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPenguins = Object.values(penguinData).filter((penguin) =>
    penguin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Penguin Collection
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search penguins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPenguins.map((penguin: PenguinData) => (
          <Link href={`/${penguin.id}`} key={penguin.id}>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={penguin.imageUrl}
                  alt={penguin.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{penguin.name}</h2>
              <p className="text-gray-600">Rarity: {penguin.rarity}</p>
              {penguin.suburb && (
                <p className="text-gray-600">Suburb: {penguin.suburb}</p>
              )}
              {penguin.street && (
                <p className="text-gray-600">Street: {penguin.street}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
