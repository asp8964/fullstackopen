interface TotalProps {
  totalExercises: number;
}

const Total = ({ totalExercises }: TotalProps) => (
  <div>Number of exercises {totalExercises}</div>
);

export default Total;
