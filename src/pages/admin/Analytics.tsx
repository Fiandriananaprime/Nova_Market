import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { StatCard, BarStat } from "@/components/ui";
import { formatMillionAr, formatPrice } from "@/hook/format";
import { useTranslation } from "react-i18next";
import { useToast } from "@/contexts/ToastContext";
import { getApiErrorMessage } from "@/api/errorMessage";
import { getAnalytics } from "@/api/admin/analytics.api";
import {
  AnalyticsPeriod,
  AnalyticsResponse,
} from "@/type/admin/Analytics";

const dateFilters: {
  label: string;
  value: AnalyticsPeriod;
}[] = [
  { label: "Today", value: "today" },
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
  { label: "3 months", value: "3m" },
  { label: "Custom", value: "custom" },
];

const categoryColors = [
  "#0077B6",
  "#5ABCB9",
  "#8da8b5",
  "#D0CCD0",
];

export default function Analytics() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [period, setPeriod] =
    useState<AnalyticsPeriod>("30d");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (
      period === "custom" &&
      (!fromDate || !toDate || fromDate > toDate)
    ) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await getAnalytics({
          period,
          ...(period === "custom" && {
            from: fromDate,
            to: toDate,
          }),
        });

        setData(response);
      } catch (error) {
        toast(
          getApiErrorMessage(
            error,
            "Error while fetching analytics"
          ),
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period, fromDate, toDate, toast]);

  const handlePeriodChange = (
    value: AnalyticsPeriod
  ) => {
    setPeriod(value);

    if (value !== "custom") {
      setFromDate("");
      setToDate("");
    }
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm text-muted-foreground">
          {t("Loading analytics...")}
        </div>
      </div>
    );
  }

  const revenueSeries =
    data?.revenueSeries ?? [];

  const orderSeries =
    data?.orderSeries ?? [];

  const topSellers =
    data?.topSellers ?? [];

  const categoryData = (() => {
    const categories = [
      ...(data?.topCategories ?? []),
    ].sort(
      (a, b) =>
        b.percentage - a.percentage
    );

    const top = categories.slice(0, 6);

    const other = categories
      .slice(6)
      .reduce(
        (sum, category) =>
          sum + category.percentage,
        0
      );

    return other > 0
      ? [
          ...top,
          {
            name: t("Other"),
            percentage: other,
          },
        ]
      : top;
  })();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-xl font-bold font-display text-secondary-foreground">
          {t("Analytics")}
        </h1>

        <div className="flex flex-wrap gap-1 bg-secondary p-1 rounded-xl">
          {dateFilters.map(
            ({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  handlePeriodChange(value)
                }
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  period === value
                    ? "bg-card text-secondary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-secondary-foreground"
                }`}
              >
                {t(label)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Custom date range */}
      {period === "custom" && (
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: "analytics-from",
                label: "From",
                value: fromDate,
                setValue: setFromDate,
                max:
                  toDate || undefined,
              },
              {
                id: "analytics-to",
                label: "To",
                value: toDate,
                setValue: setToDate,
                min:
                  fromDate || undefined,
              },
            ].map(
              ({
                id,
                label,
                value,
                setValue,
                min,
                max,
              }) => (
                <div
                  key={id}
                  className="space-y-1.5"
                >
                  <label
                    htmlFor={id}
                    className="text-sm font-medium text-secondary-foreground"
                  >
                    {t(label)}
                  </label>

                  <input
                    id={id}
                    type="date"
                    value={value}
                    min={min}
                    max={max}
                    onChange={(e) =>
                      setValue(
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-secondary-foreground outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              )
            )}
          </div>

          {fromDate &&
            toDate &&
            fromDate > toDate && (
              <p className="mt-2 text-xs text-destructive">
                {t(
                  "The start date must be before the end date."
                )}
              </p>
            )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Revenue",
            value: formatMillionAr(
              data?.totalRevenue ?? 0
            ),
            icon: (
              <DollarSign className="w-5 h-5" />
            ),
            color: "#0077B6",
          },
          {
            title: "Orders",
            value: String(
              data?.totalOrders ?? 0
            ),
            icon: (
              <ShoppingCart className="w-5 h-5" />
            ),
            color: "#5ABCB9",
          },
          {
            title: "Buyers",
            value: String(
              data?.totalBuyers ?? 0
            ),
            icon: (
              <Users className="w-5 h-5" />
            ),
            color: "#0077B6",
          },
          {
            title: "Sellers",
            value: String(
              data?.totalSellers ?? 0
            ),
            icon: (
              <TrendingUp className="w-5 h-5" />
            ),
            color: "#5ABCB9",
          },
        ].map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
            title={t(stat.title)}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Revenue */}
        <BarStat
          title={t("Revenue over time")}
          data={revenueSeries}
        />

        {/* Orders */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-semibold font-display text-secondary-foreground mb-4">
            {t("Orders over time")}
          </h2>

          {orderSeries.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground">
              {t("No data available")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={orderSeries}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  tick={{
                    fontSize: 12,
                    fill: "var(--muted-foreground)",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{
                    fontSize: 11,
                    fill: "var(--muted-foreground)",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#5ABCB9"
                  strokeWidth={2.5}
                  dot={{ fill: "#5ABCB9", r: 3 }}
                  name={t("Orders")}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top sellers */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-semibold font-display text-secondary-foreground mb-4">
            {t("Top sellers")}
          </h2>

          {topSellers.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground">
              {t("No data available")}
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={200}
            >
              <BarChart
                data={topSellers}
                layout="vertical"
                barSize={14}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  tick={{
                    fontSize: 11,
                    fill: "var(--muted-foreground)",
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    `${(
                      Number(value) /
                      1_000_000
                    ).toFixed(0)}M`
                  }
                />

                <YAxis
                  type="category"
                  dataKey="sellerName"
                  tick={{
                    fontSize: 11,
                    fill: "var(--muted-foreground)",
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />

                <Tooltip
                  formatter={(value) => [
                    formatPrice(
                      Number(
                        value ?? 0
                      )
                    ),
                    t("Revenue"),
                  ]}
                  contentStyle={{
                    background:
                      "var(--card)",
                    border:
                      "1px solid var(--border)",
                    borderRadius:
                      "8px",
                    fontSize: "12px",
                  }}
                />

                <Bar
                  dataKey="revenue"
                  fill="#5ABCB9"
                  radius={[
                    0,
                    4,
                    4,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Sales by category */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-semibold font-display text-secondary-foreground mb-4">
            {t("Sales by category")}
          </h2>

          {categoryData.length === 0 ? (
            <div className="flex items-center justify-center h-[180px] text-sm text-muted-foreground">
              {t("No data available")}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <ResponsiveContainer
                width="60%"
                height={180}
              >
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="percentage"
                    paddingAngle={3}
                  >
                    {categoryData.map(
                      (
                        entry,
                        index
                      ) => (
                        <Cell
                          key={`${entry.name}-${index}`}
                          fill={
                            categoryColors[
                              index %
                                categoryColors.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [
                      `${Number(
                        value ?? 0
                      )}%`,
                      t("Sales"),
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex-1 space-y-2 min-w-0">
                {categoryData.map(
                  (
                    category,
                    index
                  ) => (
                    <div
                      key={
                        category.name
                      }
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor:
                            categoryColors[
                              index %
                                categoryColors.length
                            ],
                        }}
                      />

                      <span className="text-muted-foreground truncate">
                        {
                          category.name
                        }
                      </span>

                      <span className="font-bold text-secondary-foreground ml-auto">
                        {
                          category.percentage
                        }
                        %
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
