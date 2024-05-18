import { useAuthContext } from "../../util/AuthContext.jsx";

function Username() {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <div className="hidden text-sm font-semibold text-orange-400 md:block">
      {user}
    </div>
  );
}

export default Username;
