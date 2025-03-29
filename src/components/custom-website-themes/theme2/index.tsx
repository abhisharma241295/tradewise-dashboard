import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import BrideGroom from "./components/BrideGroom";
import TimeRemains from "./components/TimeRemain";
import Story from "./components/Story";
import BestFriend from "./components/BestFriend";
import LoveStory from "./components/LoveStory";
import Organization from "./components/Organization";
import Memories from "./components/Memories";
import StoreMemories from "./components/StoreMemories";
import SaveDate from "./components/SaveDate";
import Ceremony from "./components/Ceremony";
import Menu from "./components/Menu";
import Invitation from "./components/Invitation";
import Bottom from "./components/Bottom";
import TopBar from "./components/TopBar";
import Registry from "./components/Registry";
import { injectFontStyles } from "../theme1/styles/fonts";

const Theme2: React.FC = () => {
	useEffect(() => {
		injectFontStyles();
	  }, []);
	
	return (
		<div className=" flex flex-col items-center justify-center text-center">
			<TopBar />
			<Hero />
			<Welcome />
			<BrideGroom />
			<TimeRemains />
			<Story />
			<BestFriend />
			<LoveStory />
			<Organization />
			<Memories />
			<StoreMemories />
			<SaveDate />
			<Ceremony />
			<Menu />
			<Invitation />
			<Registry />
			<Bottom />
		</div>
	);
};

export default Theme2;
