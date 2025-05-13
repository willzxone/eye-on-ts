import AllVideoGallery from "@/common/components/gallery/AllVideoGallery"

const ProcessVideo = () => {
  return (
    <div>
        <AllVideoGallery 
            showUploadInGallery={false}
            heading={"Select videos from below to search the selected object"}
        />
    </div>
  )
}

export default ProcessVideo