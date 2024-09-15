"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { penguinData } from "@/lib/penguinData";
import InfoModal from "@/components/InfoModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function PenguinPage() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [collecting, setCollecting] = useState(false);
  const [collectionInfo, setCollectionInfo] = useState<{
    penguinsCollected: number;
    newPenguin?: string;
  } | null>(null);

  const penguin = typeof id === "string" ? penguinData[id] : null;

  if (!penguin) {
    return <div>Penguin not found</div>;
  }

  const handleCollect = async () => {
    if (username.trim() === "") {
      alert("Please enter a username");
      return;
    }

    setCollecting(true);

    try {
      console.log(`DEBUG | collecting penguin at url "${API_URL}/api/collect"`);
      const response = await fetch(`${API_URL}/api/collect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, penguinId: penguin.id }),
      });

      const responseText = await response.text();
      console.log("Full response:", responseText);

      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          setCollectionInfo({
            penguinsCollected: data.penguinsCollected,
            newPenguin: data.newPenguin,
          });
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          throw new Error("Invalid response format");
        }
      } else {
        throw new Error(responseText || "Failed to collect penguin");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );
    } finally {
      setCollecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <main className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">{penguin.name}</h1>
        <div className="relative w-full h-64 mb-4">
          <Image
            src={penguin.imageUrl}
            alt={penguin.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded"
          />
        </div>

        <div className="space-y-2">
          <p className="text-lg">
            <strong>Rarity:</strong> {penguin.rarity}
          </p>
          {penguin.suburb && (
            <p className="text-lg">
              <strong>Suburb:</strong> {penguin.suburb}
            </p>
          )}
          {penguin.street && (
            <p className="text-lg">
              <strong>Street:</strong> {penguin.street}
            </p>
          )}
        </div>

        <div className="space-y-4 mt-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleCollect}
            disabled={collecting}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
          >
            {collecting ? "Collecting..." : "Collect and Save"}
          </button>
          {collectionInfo && (
            <div className="text-center mt-4">
              <p>
                Congratulations! You've collected {collectionInfo.newPenguin}!
              </p>
              <p>
                You have now collected {collectionInfo.penguinsCollected}{" "}
                penguin(s).
              </p>
            </div>
          )}
          <button
            onClick={() => setShowInfo(true)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            What is this?
          </button>
        </div>

        {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
      </main>
    </div>
  );
}
