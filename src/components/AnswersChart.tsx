"use client";


import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

// Chart configuration
const chartConfig = {
  correct: {
    label: "Correct",
    color: "#2563eb",
  },
  false: {
    label: "False",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

// AnswersChart Component
export function AnswersChart({ answersData }: { answersData: any[] }) {

  //TODO:VERIFY this 
  console.log(typeof answersData)
  // Process answersData to prepare the chart data
  const processedData = answersData.reduce((acc: any[], answer: any) => {
    const questionKey = Object.keys(answer)[0]; 
    const {isCorrect} = answer[questionKey]; 
    console.log(isCorrect)

    // Find or create an entry for the question
    let entry = acc.find((item) => item.question === questionKey);

    if (!entry) {
      entry = { question: questionKey, correct: 0, false: 0 };
      acc.push(entry);
    }

    // Update correct or false count
    if (isCorrect) {
      entry.correct += 1;
    } else {
      entry.false += 1;
    }

    return acc;
  }, []);

  return (
    <div className="bg-white">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-1/2">
        <BarChart accessibilityLayer data={processedData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="question"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 20)} // Shorten the question text
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="correct" fill={chartConfig.correct.color} radius={4} />
          <Bar dataKey="false" fill={chartConfig.false.color} radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

