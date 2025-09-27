import { users } from "../route";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const user = users.find((user) => user.id === parseInt(id));
  // console.log("bbbbbb - ",parseInt("1eeee"))
  // console.log("user brrooo",user)
  // console.log(!user)
  if(!user) return Response.json("user not found");
  return Response.json(user);
}
