import styles from "./Spinner.module.scss"; 

export default function Spinner() {
  console.log();
  return (
    <>
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={`${styles.spinner} ${styles.large}`}></div>
      </div>
    </div>
    </>
  );
}
