import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import HistoryContext from "../store/HistoryContext";
import HistoryItem from "./HistoryItem";
import { useContext } from "react";

const HistoryStack = () => {
  const { history } = useContext(HistoryContext);

  return (
    <div 
    style={{
      display: "flex",           
      justifyContent: "center",   
      alignItems: "center",              
    }}>
    <div
    >
      <div style={{ width: "100%" }}>
        <Text
          size="xl"
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[9],
          })}
          style={{
            textAlign: "center",
          }}
        >
          Historique de transaction
        </Text>
        <Divider my="sm" />
        <ScrollArea
          type="always"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[0],
            height: 300,
            width: 500,
            paddingRight: 15,
          })}
        >
          <Stack>
            {history.map((item) => {
              return (
                <HistoryItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  amount={item.amount}
                  type={item.type}
                  dateCreated={item.dateCreated}
                  category={item.category}
                />
              );
            })}
          </Stack>
        </ScrollArea>
      </div>
    </div>
    </div>
  );
  
  
};

export default HistoryStack;
