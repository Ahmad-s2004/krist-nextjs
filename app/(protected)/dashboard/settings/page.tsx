"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: "Zain",
    lastName: "Ahmed",
    email: "krist.buyer@domain.com",
    phone: "+92 300 1234567",
  });

  const [address, setAddress] = useState({
    street: "Block 4, Clifton",
    city: "Karachi",
    state: "Sindh",
    postalCode: "75600",
    country: "Pakistan",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-neutral-100 pb-4">
        <h1 className="text-xl font-black tracking-tight text-black uppercase">Account Settings</h1>
        <p className="text-xs text-gray-400 font-medium tracking-wide pt-0.5">
          Update your personal credentials and primary delivery parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Personal Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleProfileChange}
                className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none rounded-none text-black"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleProfileChange}
                className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none rounded-none text-black"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium bg-neutral-50 border-dashed text-neutral-400 cursor-not-allowed rounded-none"
                disabled
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none rounded-none text-black"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-neutral-100">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Default Shipping Destination</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">Street Address</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleAddressChange}
                className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none rounded-none text-black"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none rounded-none text-black"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">State / Region</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none rounded-none text-black"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={address.postalCode}
                onChange={handleAddressChange}
                className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none rounded-none text-black"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">Country</label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleAddressChange}
                className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none rounded-none text-black"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-none w-full sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}