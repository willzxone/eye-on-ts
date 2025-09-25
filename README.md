# EYE-On 👁️  
**Deep Learning Multi-Camera Tracking System**  

EYE-On is a real-time multi-camera tracking platform that combines **advanced detection, segmentation, and classification models** to deliver accurate and reliable person and object tracking across multiple video streams.  

---

## 🚀 Features  
- **Segmentation with SAM2** – Frame-level object segmentation for precise region extraction.  
- **Detection with YOLOv8** – Fast and accurate object/person detection in crowded or occluded frames.  
- **Classification with Vision Transformer (ViT)** – Robust image classification and re-identification to handle occlusion and crowded scenes.  
- **Multi-Camera Tracking** – Reliable cross-camera identity matching and trajectory visualization.  
- **Video Upload & Target Selection** – Users can upload video streams, select targets, and visualize real-time tracking results.  
- **Full Pipeline** – From ingestion of unstructured video → processing → visualization.  

---

## 🛠️ Tech Stack  

### Frontend 📂
- **React 18** with **Vite**  
- **Relay & GraphQL**  
- **TailwindCSS + DaisyUI** for modern UI  
- **Monaco Editor & React-PTS** for visualization and interactivity  
- **Firebase** for authentication & storage  

### Backend 📂 
- **Flask 3** with **Strawberry GraphQL**  
- **YOLOv8** (object detection)  
- **SAM2** (segmentation)  
- **Vision Transformer (ViT)** (classification)  
- **Torch 2.6 + TorchVision**  
- **Hydra & OmegaConf** for configuration management  
- **HuggingFace Hub** for model loading  
- **Decord & AV** for video handling  
- **Flask-CORS** for cross-origin support  

---

## 📊 Pipeline Overview  

```
[ Video Input ] → [ SAM2 Segmentation ] → [ YOLOv8 Detection ] → [ ViT Classification ] 
        ↓
   [ Multi-Camera Re-ID + Tracking ]
        ↓
   [ Real-Time Visualization ]
```

---

## 🔮 Future Improvements  
- Support for **real-time streaming (RTSP/Live Feeds)**  
- Integration with **Edge AI (Jetson / ONNX Runtime)**  
- Optimized **GPU batch processing**  
- Enhanced **multi-object re-identification**  

---

## 👨‍💻 Author  
**Waleed Asif**  
- 🌐 [Portfolio](https://waleedasif.live)  
- 💼 [LinkedIn](https://linkedin.com/in/waleed--asif)  
- 🐙 [GitHub](https://github.com/willzxone)  
