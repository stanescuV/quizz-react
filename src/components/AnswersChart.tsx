"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import HostPageAnswer from "../entities/hostPageAnswers";

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "./ui/chart";

// Colors and Labels for the Chart
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

// how objects in the props look
type AnswerObject = {
    date: string;
    [key: string]:
        | {
              question: string;
              isCorrect: boolean;
              selectedOption: string;
          }
        | string;
};

// What we recive in the props
type AnswersChartProps = {
    answersData: AnswerObject[];
};

/**
 *  We take answersData : AnswersChartProps
 * and we make it processedData so we can show it easily on the frontend
 * */
export function AnswersChart({ answersData }: AnswersChartProps) {
    console.log("Input answersData:", answersData);

    //we take answersData we make it processedData

    const processedData: HostPageAnswer[] = [];
    const questionLookup: { [key: string]: HostPageAnswer } = {};

    answersData.forEach((answerObj) => {
        for (const key in answerObj) {
            if (key !== "date" && typeof answerObj[key] === "object") {
                const value = answerObj[key];
                const { question, isCorrect } = value;

                // O(1)
                if (!questionLookup[question]) {
                    questionLookup[question] = {
                        question,
                        correct: 0,
                        false: 0,
                    };
                    processedData.push(questionLookup[question]); // Keep processedData for chart rendering
                }

                // Update counts using the lookup object
                questionLookup[question][isCorrect ? "correct" : "false"] += 1;
            }
        }
    });

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
