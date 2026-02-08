"use client";

import { FC } from "react";

interface Medicine {
    name: string;
    brand: string;
    salt: string;
    strength: string;
    price: number;
    manufacturer: string;
}

interface MedicineCardProps {
    original?: Medicine;
    alternatives?: Medicine[];
}

export const MedicineCard: FC<MedicineCardProps> = ({
    original,
    alternatives = [],
}) => {
    if (!original) {
        return (
            <div className="w-full max-w-3xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-6">
                <p className="text-sm text-gray-500">
                    No medicine found.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-6">
            {/* Original Medicine */}
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                <h2 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
                    {original.name}
                </h2>

                <p className="text-sm text-blue-700 mt-1">
                    {original.brand} · {original.strength}
                </p>

                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                    <span className="px-3 py-1 rounded-full bg-white border">
                        Salt: <b>{original.salt}</b>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white border">
                        Manufacturer: <b>{original.manufacturer}</b>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 border border-green-200">
                        ₹{original.price}
                    </span>
                </div>
            </div>

            {/* Alternatives */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Cheaper Alternatives
                </h3>

                {alternatives.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No cheaper alternatives found.
                    </p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {alternatives.map((med) => (
                            <div
                                key={med.name}
                                className="rounded-xl border border-gray-200 p-4 hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-gray-900">
                                        {med.name}
                                    </h4>
                                    <span className="text-green-700 font-bold">
                                        ₹{med.price}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 mt-1">
                                    {med.brand} · {med.strength}
                                </p>

                                <p className="text-xs text-gray-500 mt-2">
                                    Salt: {med.salt}
                                </p>

                                <p className="text-xs text-gray-500">
                                    Manufacturer: {med.manufacturer}
                                </p>

                                {original.price > med.price && (
                                    <div className="mt-3 text-xs font-medium text-green-800 bg-green-50 border border-green-200 rounded-full inline-block px-3 py-1">
                                        Save ₹{original.price - med.price}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

