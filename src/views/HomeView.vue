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
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const camera = ref<InstanceType<typeof Camera>>();
    const img = ref();

    const activeDevice = ref<number>(0);

    const devicesIds = ref<string[]>([]);

    const getDevices = async () => {
      const devices = await camera.value?.devices(["videoinput"]);
      if (!devices) return;
      devicesIds.value = devices.map((d) => d.deviceId);
    };

    const snapshot = async () => {
      const blob = await camera.value?.snapshot();
      if (!blob) return;

      const url = URL.createObjectURL(blob);

      img.value = url;
    };

    const retake = () => {
      img.value = null;
    };

    const changeCamera = async () => {
      console.log(devicesIds.value);
      if (activeDevice.value === 0) {
        activeDevice.value = 1;
      } else {
        activeDevice.value = 0;
      }
      await camera.value?.changeCamera(devicesIds.value[activeDevice.value]);
    };

    onMounted(async () => {
      getDevices();
    });

    return {
      camera,
      snapshot,
      img,
      retake,
      changeCamera,
      devicesIds,
    };
  },
});
</script>
