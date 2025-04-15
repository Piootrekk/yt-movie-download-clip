import panelStyles from "./Card.module.css";

type TListItems = {
  name: string;
  value: string;
};

type PanelCardProps = {
  heading: string;
  items: TListItems[];
};

const PanelCard = ({ heading, items }: PanelCardProps) => {
  return (
    <div className={panelStyles.card}>
      <h3>{heading}</h3>
      <ul>
        {items.map((detail) => (
          <li key={detail.name}>
            <strong>{detail.name}:</strong> {detail.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelCard;
export type { TListItems };
