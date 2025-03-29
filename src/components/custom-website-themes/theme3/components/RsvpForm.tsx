import React, { useState } from "react";
import RsvpFormUI from "./Form";

export function RsvpForm() {

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-white border overflow-hidden">
        <div className="flex h-full">
          <div className="w-1/2 px-4 h-full">
           <RsvpFormUI/>
          </div>
          
          <div
            className="w-1/2 bg-cover bg-center"
            style={{
              backgroundImage: "url('./theme-3-form-image.png')",
            }}
          />
        </div>
      </div>
    </section>
  );
}