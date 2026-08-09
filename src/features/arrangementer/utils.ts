import type {
  ArrangementerConnectionQuery,
  KategorierConnectionQuery,
} from "../../../tina/__generated__/types";

type ArrangementNode = NonNullable<
  NonNullable<
    NonNullable<ArrangementerConnectionQuery["arrangementerConnection"]["edges"]>[number]
  >["node"]
>;

type CategoryNode = NonNullable<
  NonNullable<
    NonNullable<KategorierConnectionQuery["kategorierConnection"]["edges"]>[number]
  >["node"]
>;

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export type ArrangementCategory = {
  value: string;
  label: string;
};

export type GroupedArrangementEvents = Record<
  string,
  {
    label: string;
    events: ArrangementNode[];
  }
>;

export function getArrangementCategories(
  kategorierData: KategorierConnectionQuery,
): ArrangementCategory[] {
  const dynamicCategories = (kategorierData.kategorierConnection.edges || [])
    .map((edge) => edge?.node)
    .filter(
      (node): node is CategoryNode =>
        isDefined(node) && isDefined(node.value) && isDefined(node.label),
    )
    .map((node) => ({
      value: node.value as string,
      label: node.label as string,
    }));

  return [{ value: "all", label: "Alle" }, ...dynamicCategories];
}

export function getArrangementCategoryLabels(
  kategorierData: KategorierConnectionQuery,
): Record<string, string> {
  return (kategorierData.kategorierConnection.edges || [])
    .map((edge) => edge?.node)
    .filter(
      (node): node is CategoryNode =>
        isDefined(node) && isDefined(node.value) && isDefined(node.label),
    )
    .reduce(
      (acc, cat) => {
        acc[cat.value as string] = cat.label as string;
        return acc;
      },
      {} as Record<string, string>,
    );
}

export function getAlleArrangementer(
  arrangementerData: ArrangementerConnectionQuery,
): ArrangementNode[] {
  return (arrangementerData.arrangementerConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node): node is ArrangementNode => isDefined(node))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function filterArrangementerByCategory(
  arrangementer: ArrangementNode[],
  selectedCategory: string,
): ArrangementNode[] {
  if (selectedCategory === "all") {
    return arrangementer;
  }

  return arrangementer.filter(
    (arr): arr is ArrangementNode => isDefined(arr) && arr.kategorier.value === selectedCategory,
  );
}

export function groupArrangementerByMonth(
  arrangementer: ArrangementNode[],
): GroupedArrangementEvents {
  return arrangementer.reduce((acc, arr) => {
    if (!isDefined(arr)) {
      return acc;
    }

    const date = new Date(arr.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthLabel = date.toLocaleDateString("nb-NO", {
      month: "long",
      year: "numeric",
    });

    if (!acc[monthKey]) {
      acc[monthKey] = {
        label: monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1),
        events: [],
      };
    }

    acc[monthKey].events.push(arr);
    return acc;
  }, {} as GroupedArrangementEvents);
}
