import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type statisticsDataType = {
  title: string;
  value: string;
  change: string;
  isIncrease: boolean;
};

const SectionCards = ({ data }: { data: statisticsDataType[] }) => (
  <div className="flex w-full flex-wrap gap-4 rounded-xl border border-muted  p-4">
    {data.map((stat, index) => (
      <Card key={index} className="min-w-[200px] flex-1 rounded-xl shadow-sm">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{stat.title}</span>
            <div className="flex items-center gap-1 text-sm font-medium">
              {stat.isIncrease ? (
                <ArrowUpRight className="size-4 text-green-500" />
              ) : (
                <ArrowDownRight className="size-4 text-red-500" />
              )}
              <span
                className={stat.isIncrease ? "text-green-500" : "text-red-500"}
              >
                {stat.change}
              </span>
            </div>
          </div>
          <div className="text-2xl font-semibold text-foreground">
            {stat.value}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default SectionCards;
