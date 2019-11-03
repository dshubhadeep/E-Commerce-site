<template>
  <div class="input-wrapper">
    <label for>{{label}}</label>
    <input :type="type" class="field" :name="name" :placeholder="placeholder" :disabled="disabled" />
  </div>
</template>


<script>
export default {
  name: "CustomInput",
  props: {
    label: String,
    name: String,
    placeholder: String,
    disabled: Boolean,
    type: String
  }
};
</script>


<style scoped>
.input-wrapper {
  text-align: center;
}

label {
  display: block;
  margin-bottom: 12px;
  color: rgba(29, 31, 46, 0.6);
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.field {
  display: block;
  height: 54px;
  margin-bottom: 20px;
  padding: 18px 24px;
  border: 1px solid #e5e5e7;
  border-radius: 0px;
  -webkit-transition: border 400ms ease, color 400ms ease;
  transition: border 400ms ease, color 400ms ease;
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  width: 100%;
}

.field:hover {
  border-color: rgba(29, 31, 46, 0.5);
}

.field:active {
  border-color: #1d1f2e;
}

.field:focus {
  border-color: #1d1f2e;
}
</style>