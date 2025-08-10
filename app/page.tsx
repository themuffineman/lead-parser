"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Download, Loader2 } from "lucide-react";
import * as cheerio from "cheerio";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { LeadPlatforms, Parser } from "@/lib/htmlparser";
export default function Component() {
  const leadPlatform: LeadPlatforms[] = ["Apollo", "Sales Navigator"];
  const [selectedPlatform, setSelectedPlatform] = useState<string>(
    leadPlatform[0]
  );
  const [htmlContent, setHtmlContent] = useState("");
  const [extractedData, setExtractedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleParseHTML = async () => {
    setIsLoading(true);
    try {
      const parserRes = await fetch("/api/parse", {
        method: "POST",
        body: JSON.stringify({
          html: htmlContent,
          platform: selectedPlatform,
        }),
      });
      if (!parserRes.ok) {
        throw new Error("Failed to parse HTML");
      }
      const data = await parserRes.json();
      console.log("Parsed Data:", data);
      setExtractedData(data);
    } catch (error) {
      console.error("Error parsing HTML:", error);
      setExtractedData([]);
    }
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen bg-black text-green-400 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold inline-flex items-center gap-4 mb-8 font-[Inter_Tight] tracking-tight">
          Lead Parser{" "}
          <Select
            onValueChange={setSelectedPlatform}
            defaultValue={leadPlatform[0]}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {leadPlatform.map((platform) => (
                <SelectItem value={platform}>{platform}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">HTML Input</h2>
              <Button
                onClick={handleParseHTML}
                className="bg-green-600 cursor-pointer hover:bg-green-700 text-black font-semibold rounded-none"
              >
                Parse HTML
                {isLoading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
              </Button>
            </div>
            <Textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="Enter your HTML content here..."
              className="w-full h-96 bg-black border border-green-400/30 text-green-400 placeholder:text-green-400/50 rounded-none font-mono text-sm resize-none focus:border-green-400 focus:ring-0 focus:ring-offset-0"
            />
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h2 className="text-xl font-semibold">Extracted Data</h2>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-black font-semibold rounded-none"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy JSON
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-none"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            <div className="bg-gray-900 border border-green-400/30 rounded-none p-4 h-96 overflow-auto">
              <div className="text-green-400/50 font-mono text-sm">
                {extractedData.length > 0 ? (
                  <pre>{extractedData}</pre>
                ) : (
                  <p className="text-center">No data extracted yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
