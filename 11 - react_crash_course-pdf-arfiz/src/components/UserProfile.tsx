interface UserProfileProps {
name: string
email: string
avatar: string
}
function UserProfile({ name, email, avatar }: UserProfileProps) {
return (
<div className="user-profile">
<img src={avatar} alt={`${name}'s avatar`} />
<h2>{name}</h2>

<p>{email}</p>
</div>
)
}
export default UserProfile