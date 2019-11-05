<template>
  <div class="upload-wrapper">
    <label for="productImage">Product Image</label>
    <div class="dropper">
      <input
        id="productImage"
        type="file"
        name="productImage"
        accept="image/*"
        @change="handleChange($event)"
      />
      <span class="input-text">Drag files here</span>
    </div>
    <div v-show="imageUploaded" class="mt-2">
      <img class="object-cover h-32 w-full rounded-sm" id="fileImage" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Uploader",
  data() {
    return {
      imageUploaded: false
    };
  },
  methods: {
    async handleChange(event) {
      console.log("files changed", event.target.files[0]);
      const { files } = event.target;
      const reader = new FileReader();

      reader.onload = ({ target }) => {
        // get loaded data and render thumbnail.
        document.getElementById("fileImage").src = target.result;
        this.imageUploaded = true;
      };

      // read the image file as a data URL.
      reader.readAsDataURL(files[0]);
    }
  }
};
</script>

<style scoped>
.upload-wrapper {
  text-align: center;
}

.dropper {
  height: 120px;
  border: 1px dashed #e5e5e7;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.dropper:hover {
  background: #eee;
}

label,
.input-text {
  display: block;
  margin-bottom: 12px;
  color: rgba(29, 31, 46, 0.6);
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

input {
  width: 100%;
  height: 30vh;
  position: absolute;
  opacity: 0;
}
</style>