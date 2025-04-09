import styles from "./YtLinkForm.module.css";
import { FormEvent } from "react";

type YtFiltersFormProps = {
  handleFormValues: (newValue: unknown) => void;
};

const YtFiltersForm = ({ handleFormValues }: YtFiltersFormProps) => {
  const handleFiltersForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filtersData = {
      url: formData.get("ytLink")?.toString(),
      clients: formData.getAll("clients").map((client) => client.toString()),
    };
    handleFormValues(filtersData);
  };

  return (
    <form className={styles.form} onSubmit={handleFiltersForm}>
      <input
        type="text"
        placeholder="Paste YouTube URL here..."
        className={styles.input}
        name="ytLink"
      />
      <button type="submit" className={styles.button}>
        {"Fetch"}
      </button>
    </form>
  );
};

export default YtFiltersForm;
