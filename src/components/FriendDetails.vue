<template>
    <div class="text-2xl">
        {{ selectedFriend.username }}
    </div>
</template>

<script>
export default {
    props: {
        selectedFriend: null,
    }
}

</script>