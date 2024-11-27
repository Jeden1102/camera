<template>
  <div class="max-w-md mx-auto p-4">
    <camera
      :resolution="{ width: 375, height: 812 }"
      ref="camera"
      autoplay
      class="w-full h-96 border border-gray-300 rounded-lg"
    />
    <div class="flex justify-center mt-4">
      <button
        @click="snapshot"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Capture
      </button>
      <button @click="changeCamera">chaneg camera</button>
      <button
        @click="retake"
        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ml-4"
        v-if="img"
      >
        Retake
      </button>
    </div>
    <div class="mt-4" v-if="img">
      <img
        :src="img"
        alt="Captured Image"
        class="w-full h-96 object-cover rounded-lg"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Camera from "simple-vue-camera";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const camera = ref<InstanceType<typeof Camera>>();
    const img = ref();

    const snapshot = async () => {
      const blob = await camera.value?.snapshot();

      const url = URL.createObjectURL(blob);

      img.value = url;
    };

    const retake = () => {
      img.value = null;
    };

    const changeCamera = async () => {
      await camera.value?.changeCamera(camera.value.currentDeviceID());
      console.log(camera.value?.currentDeviceID());
    };

    return {
      camera,
      snapshot,
      img,
      retake,
      changeCamera,
    };
  },
});
</script>
