// Shim for 'stream' module
import Module from 'stream-browserify';

export default Module;
export const Readable = Module.Readable;
export const Writable = Module.Writable;
export const Duplex = Module.Duplex;
export const Transform = Module.Transform;
export const PassThrough = Module.PassThrough;
export const pipeline = Module.pipeline;
export const finished = Module.finished;
export const Stream = Module;

