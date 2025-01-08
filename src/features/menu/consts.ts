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
              dishes: ["2", "3"],
            },
            {
              type: "Ужин",
              dishes: ["4"],
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
      name: "Яичница",
      groupName: "Завтраки",
      ingredients: [{ name: "Яйцо", count: 3, unit: "шт" }],
    },
    {
      id: "2",
      name: "Куриный бульон с лапшой",
      groupName: "Обеды",
      ingredients: [
        { name: "Куриный окорок", count: 1, unit: "шт" },
        { name: "Лапша", count: 0.1, unit: "кг" },
        { name: "Яйцо", count: 1, unit: "шт" },
      ],
    },
    {
      id: "3",
      name: "Салат овощной",
      groupName: "Салаты",
      ingredients: [
        { name: "Огурец", count: 1, unit: "шт" },
        { name: "Помидор", count: 2, unit: "шт" },
        { name: "Капуста белокачанная", count: 0.1, unit: "кг" },
      ],
    },
    {
      id: "4",
      name: "Пельмени полуфабрикат",
      groupName: "Ужин",
      ingredients: [{ name: "Пельмени", count: 1, unit: "кг" }],
    },
  ],
};
