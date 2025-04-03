"use client";
import { useState, useEffect } from "react";
import Drawer from "@/components/common/drawer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import InitialSubscriptionDialog from "@/components/common/initialSubscriptionDialog";
import { Dialog } from "@/components/ui/dialog";
import { useAppSelector } from "@/redux/hooks";
interface RootLayoutProps {
	children: React.ReactNode;
}
export default function RootLayouts({ children }: RootLayoutProps) {
	const userSubscribed = useAppSelector((state) => state.auth.userSubscribed);
	const [showSubscription, setShowSubscription] = useState(false);

	useEffect(() => {
		if (!userSubscribed) setShowSubscription(true);
	}, [userSubscribed]);

	return (
		<SidebarProvider>
			<Drawer />
			<main className="flex-1 relative">
				<Toaster theme="system" position="top-center" />
				<div className="absolute top-0 left-0 w-full h-full">{children}</div>
				{/* <SidebarTrigger className="absolute top-4 left-2" /> */}
			</main>
			<Dialog open={showSubscription} modal={true}>
				{/* <InitialSubscriptionDialog /> */}
			</Dialog>
		</SidebarProvider>
	);
}
