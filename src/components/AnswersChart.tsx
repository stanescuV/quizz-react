"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import HostPageAnswer from "../entities/hostPageAnswers";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "./shadcn-components/chart";

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

// Props type
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

type AnswersChartProps = {
    answersData: AnswerObject[];
};

/**
 * This component processes the received answers data into a format usable by the chart.
 */
export function AnswersChart({ answersData }: AnswersChartProps) {
    console.log("Received answersData in AnswersChart:", answersData);

    // Process data only when answersData changes
    const processedData = useMemo(() => {
        const result: HostPageAnswer[] = [];
        const questionLookup: { [key: string]: HostPageAnswer } = {};

        answersData.forEach((answerObj) => {
            for (const key in answerObj) {
                if (key !== "date" && typeof answerObj[key] === "object") {
                    const value = answerObj[key] as {
                        question: string;
                        isCorrect: boolean;
                    };
                    const { question, isCorrect } = value;

                    if (!questionLookup[question]) {
                        questionLookup[question] = {
                            question,
                            correct: 0,
                            false: 0,
                        };
                        result.push(questionLookup[question]);
                    }

                    questionLookup[question][
                        isCorrect ? "correct" : "false"
                    ] += 1;
                }
            }
        });

        console.log("Processed chart data:", result);
        return result;
    }, [answersData]); // Dependency on answersData

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
                        tickFormatter={(value) => value.slice(0, 20)} // Shorten question names
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

            <div>
                {processedData.map((hostPageAnswer, index) => {
                    return (
                        <div key={index}>
                            {hostPageAnswer.question} Correct :
                            {hostPageAnswer.correct} False:
                            {hostPageAnswer.false}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
