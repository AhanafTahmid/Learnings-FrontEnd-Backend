import IconCard from "@/components/icon-card";
import getTools from "@/lib/getTools";

const ToolsCards = async () => {
    const tools = await getTools();
    const toolsWithData = await Promise.all(tools);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6 py-6">
                {toolsWithData.map((tool) => (
                    <IconCard key={tool} tool={tool} />
                ))}
            </div>
        </div>
    );
};

export default ToolsCards;
