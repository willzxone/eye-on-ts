 
import BaseGLEffect from '@/common/components/video/effects/BaseGLEffect';
import {
  EffectFrameContext,
  EffectInit,
} from '@/common/components/video/effects/Effect';
import vertexShaderSource from '@/common/components/video/effects/shaders/DefaultVert.vert?raw';
import fragmentShaderSource from '@/common/components/video/effects/shaders/Gradient.frag?raw';
import {Tracklet} from '@/common/tracker/Tracker';
import {generateLUTDATA, load3DLUT} from '@/common/utils/ShaderUtils';
import invariant from 'invariant';
import {CanvasForm} from 'pts';

export default class GradientEffect extends BaseGLEffect {
  private lutSize: number = 2;
  private _lutTextures: WebGLTexture[] = [];

  // Must be 1, main background texture takes 0.
  private _extraTextureUnit: number = 1;

  constructor() {
    super(3);

    this.vertexShaderSource = vertexShaderSource;
    this.fragmentShaderSource = fragmentShaderSource;
  }

  protected setupUniforms(
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    init: EffectInit,
  ): void {
    super.setupUniforms(gl, program, init);

    gl.uniform1i(
      gl.getUniformLocation(program, 'uColorGradeLUT'),
      this._extraTextureUnit,
    );

    this._lutTextures = []; // clear any previous pool of textures

    for (let i = 0; i < this.numVariants; i++) {
      const _lutData = generateLUTDATA(this.lutSize);
      const _extraTexture = load3DLUT(gl, this.lutSize, _lutData);
      this._lutTextures.push(_extraTexture as WebGLTexture);
    }
  }

  apply(form: CanvasForm, context: EffectFrameContext, _tracklets: Tracklet[]) {
    const gl = this._gl;
    const program = this._program;

    if (!program) {
      return;
    }
    invariant(gl !== null, 'WebGL2 context is required');

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Bind the LUT texture to texture unit 1
    const lutTexture = this._lutTextures[this.variant];
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_3D, lutTexture);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._frameTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      context.width,
      context.height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      context.frame,
    );

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    const ctx = form.ctx;
    invariant(this._canvas !== null, 'canvas is required');
    ctx.drawImage(this._canvas, 0, 0);
  }
}
