import { MenuStore } from "./types";

export const EmptyMenu = {
  id: "",
  name: "Новое Меню",
  days: [
    {
      day: "Понедельник",
      meals: [
        {
          type: "Завтрак",
          dishes: [],
        },
        {
          type: "Обед",
          dishes: [],
        },
        {
          type: "Ужин",
          dishes: [],
        },
      ],
    },
    {
      day: "Вторник",
      meals: [
        {
          type: "Завтрак",
          dishes: [],
        },
        {
          type: "Обед",
          dishes: [],
        },
        {
          type: "Ужин",
          dishes: [],
        },
      ],
    },
    {
      day: "Среда",
      meals: [
        {
          type: "Завтрак",
          dishes: [],
        },
        {
          type: "Обед",
          dishes: [],
        },
        {
          type: "Ужин",
          dishes: [],
        },
      ],
    },
    {
      day: "Четверг",
      meals: [
        {
          type: "Завтрак",
          dishes: [],
        },
        {
          type: "Обед",
          dishes: [],
        },
        {
          type: "Ужин",
          dishes: [],
        },
      ],
    },
    {
      day: "Пятница",
      meals: [
        {
          type: "Завтрак",
          dishes: [],
        },
        {
          type: "Обед",
          dishes: [],
        },
        {
          type: "Ужин",
          dishes: [],
        },
      ],
    },
    {
      day: "Суббота",
      meals: [
        {
          type: "Завтрак",
          dishes: [],
        },
        {
          type: "Обед",
          dishes: [],
        },
        {
          type: "Ужин",
          dishes: [],
        },
      ],
    },
    {
      day: "Воскресенье",
      meals: [
        {
          type: "Завтрак",
          dishes: [],
        },
        {
          type: "Обед",
          dishes: [],
        },
        {
          type: "Ужин",
          dishes: [],
        },
      ],
    },
  ],
};

export const defaultMenuValue: MenuStore = {
  menus: [
    {
      ...EmptyMenu,
      id: "1",
      name: "Меню 1",
      days: [
        {
          day: "Понедельник",
          meals: [
            {
              type: "Завтрак",
              dishes: ["1"],
            },
            {
              type: "Обед",
              dishes: ["2"],
            },
            {
              type: "Ужин",
              dishes: ["3"],
            },
          ],
        },
        ...EmptyMenu.days.slice(1),
      ],
    },
  ],
  dishes: [
    {
      id: "1",
      name: "Oatmeal",
      ingredients: [
        { name: "Яйцо", count: 1, unit: "шт" },
        { name: "Молоко", count: 0.1, unit: "л" },
      ],
    },
    { id: "2", name: "Soup", ingredients: [] },
    { id: "3", name: "Grilled Chicken", ingredients: [] },
    { id: "4", name: "New soup", ingredients: [] },
  ],
};
