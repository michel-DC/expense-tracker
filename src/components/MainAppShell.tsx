import {
  AppShell,
  Burger,
  ColorScheme,
  ColorSchemeProvider,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CiMoneyBill } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { MdOutlineAddchart } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import DarkLightThemeButton from "./DarkLightThemeButton";
import NavigationLink from "./NavigationLink";
import HomePage from "../pages/HomePage";
import AddBudgetPage from "../pages/AddBudgetPage";
import AddExpensePage from "../pages/AddExpensePage";
import { useLocalStorage } from "@mantine/hooks";
import DisplayCategoriesPage from "../pages/DisplayCategoriesPage";

type HistoryElement = {
  id: string;
  label: string;
  amount: number;
  type: string;
};

const MainAppShell = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme",
    defaultValue: "dark",
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <BrowserRouter>
          <AppShell
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[0],
                width: "100%",
              },
            })}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
              <Navbar
                p="md"
                hiddenBreakpoint="sm"
                hidden={!opened}
                width={{ sm: 250, lg: 200 }}
              >
                <div className="div-home" style={{ width: "100px" }}>
                  <NavigationLink label="Home" icon={<FaHome />} link="/" />
                  <br />
                </div>

                <div>
                  <NavigationLink
                    label="Ajouter une dépense"
                    icon={<MdOutlineAddchart />}
                    link="/newExpense"
                  />
                  <br />
                </div>

                <div>
                  <NavigationLink
                    label="Ajoutez/mettez à jour votre budget"
                    icon={<MdOutlinePlaylistAdd />}
                    link="/newBudget"
                  />
                  <br />
                </div>

                <div>
                  <NavigationLink
                    label="Afficher les dépenses dans les catégories"
                    icon={<IoEyeSharp />}
                    link="/categories"
                  />
                  <br />
                </div>
              </Navbar>
            }
            header={
              <Header
                height={{ base: 50, md: 70 }}
                p="md"
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[9]
                      : theme.colors.gray[9],
                  fontSize: "25px",
                })}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </MediaQuery>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CiMoneyBill
                      style={{
                        color: "white",
                      }}
                    />
                    <div style={{ alignItems: "center", display: "flex" }}>
                      <Text
                        className="text-header"
                        ml={770}
                        style={{
                          paddingLeft: "80px",
                          display: "flex",
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        Traquez vos dépenses
                      </Text>
                    </div>
                  </div>
                  <DarkLightThemeButton />
                </div>
              </Header>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/newExpense" element={<AddExpensePage />} />
              <Route path="/newBudget" element={<AddBudgetPage />} />
              <Route path="/categories" element={<DisplayCategoriesPage />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default MainAppShell;
