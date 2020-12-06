export default function ({ store, redirect }) {
    const member = store.state.member.user;
    if (!member.firstName || !member.dateOfBirth) {
        redirect('/member/setUpProfile');
    }
}