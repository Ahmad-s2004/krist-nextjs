"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllOrder } from "@/backend/services/orderService"; 


interface IOrderItem {
  id: string | number;
  trackingId: string;
  createdAt: string;
  items: any[];
  totalPrice: number;
  status: string;
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<IOrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const mockUserId = "65aef1234567890123456789"; 
        const response = await getAllOrder(mockUserId as any);
        
        if (response && response.success) {
          setOrders(response.data || []);
        } else {
          setError(response?.message || "Failed to load order pipeline.");
        }
      } catch (err: any) {
        setError(err?.message || "Internal server error fetching historical trace.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "processing": return "bg-blue-50 text-blue-700 border-blue-100";
      case "cancelled": return "bg-red-50 text-red-700 border-red-100";
      default: return "bg-neutral-100 text-neutral-600 border-neutral-200";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-100 pb-4">
        <h1 className="text-xl font-black tracking-tight text-black uppercase">Order History</h1>
        <p className="text-xs text-gray-400 font-medium tracking-wide pt-0.5">
          Manage and monitor all active fulfillment cycles.
        </p>
      </div>

      {loading ? (
        <div className="border border-neutral-100 p-8 text-center text-xs font-bold uppercase tracking-widest text-neutral-400">
          Syncing records manifest...
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-4 py-3">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="border border-neutral-100 p-8 text-center text-xs font-bold uppercase tracking-widest text-neutral-400">
          No active deployments mapped to this account checklist.
        </div>
      ) : (
        <div className="border border-neutral-100 overflow-x-auto rounded-none">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-neutral-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-neutral-100">
                <th className="px-6 py-4">Reference ID</th>
                <th className="px-6 py-4">Date Authorized</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Status Token</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs font-medium text-neutral-700 divide-y divide-neutral-50 tracking-wide">
              {orders.map((order) => {
                const totalItems = order.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
                return (
                  <tr key={order.id || order.trackingId} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-black">{order.trackingId}</td>
                    <td className="px-6 py-4 text-neutral-500">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4 text-neutral-500">{totalItems} {totalItems === 1 ? "Item" : "Items"}</td>
                    <td className="px-6 py-4 font-bold text-black">Rs. {order.totalPrice}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-none ${getStatusStyle(order.status)}`}>
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/dashboard/orders/${order.trackingId}`}
                        className="inline-block bg-black text-white px-3 py-1.5 font-bold text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-none"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}