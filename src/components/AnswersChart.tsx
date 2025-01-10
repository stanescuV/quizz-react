"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import HostPageAnswer from "../entities/hostPageAnswers"; // Assuming HostPageAnswer is defined correctly

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "./ui/chart";

//TODO: WRITE THIS ON YOUR OWN
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

// Define the shape of each answer object
type AnswerObject = {
    question: string;
    date: string;
    isCorrect: boolean;
    selectedOption: string;
};

// AnswersChart Component
export function AnswersChart({
    answersData,
}: {
    answersData: { [key: string]: AnswerObject }[];
}) {
    console.log("Input answersData:", answersData); // Debugging log

    // Process answersData to prepare the chart data
    const processedData: HostPageAnswer[] = answersData.reduce(
        (acc: HostPageAnswer[], answerObj) => {
            // Iterate through each question object in answerObj
            Object.entries(answerObj).forEach(([questionKey, answer]) => {
                const { isCorrect } = answer;

                // Find or create an entry for the question
                let entry = acc.find((item) => item.question === questionKey);
                if (!entry) {
                    entry = { question: questionKey, correct: 0, false: 0 };
                    acc.push(entry);
                }

                // Update correct or false count based on isCorrect value
                if (isCorrect) {
                    entry.correct += 1;
                } else {
                    entry.false += 1;
                }
            });

            return acc;
        },
        []
    );

    console.log("Processed chart data:", processedData); // Debugging log

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full max-w-3xl mx-auto"
            >
                <BarChart data={processedData} barGap={4}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                        dataKey="question"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 20)} // Shorten question names if too long
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                        dataKey="correct"
                        fill={chartConfig.correct.color}
                        radius={4}
                    />
                    <Bar
                        dataKey="false"
                        fill={chartConfig.false.color}
                        radius={4}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
