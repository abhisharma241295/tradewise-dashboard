import React, { useState } from 'react';

interface Template {
  id: number;
  name: string;
  image: string;
  selected: boolean;
}

const WebsiteTemplateChooser = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      name: 'Temp Name 1',
      image: '/website-layout-images/theme1.png',
      selected: true,
    },
    {
      id: 2,
      name: 'Temp Name 2',
      image: '/website-layout-images/theme2.png',
      selected: false,
    },
    {
      id: 3,
      name: 'Temp Name 3',
      image: '/website-layout-images/theme3.png',
      selected: false,
    },
  ]);

  const handleSelect = (id: number) => {
    setTemplates(templates.map(template => ({
      ...template,
      selected: template.id === id
    })));
  };

  return (
    <div className="p-2 bg-white overflow-y-auto">
      <h1 className="font-semibold text-gray-700 mb-2">Select Design Template</h1>
      
      <div className="overflow-x-auto">
        <div className="flex space-x-6  pb-4">
          {templates.map((template) => (
            <div key={template.id} className="relative flex-shrink-0">
              <div 
                className={`rounded-lg overflow-hidden cursor-pointer border-2 transition-all
                  ${template.selected ? 'border-blue-500' : 'border-gray-200'}`}
                onClick={() => handleSelect(template.id)}
              >
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-32 object-cover"
                />
              </div>
              
              <div className="flex items-center mt-3">
                <div 
                  className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center
                    ${template.selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}
                >
                  {template.selected && (
                    <div className="w-2 h-2 bg-white rounded-full"/>
                  )}
                </div>
                <span className="text-sm text-gray-700">{template.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebsiteTemplateChooser;